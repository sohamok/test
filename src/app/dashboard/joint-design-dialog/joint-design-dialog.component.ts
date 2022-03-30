import { Component, OnInit, Inject  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { JointDesignService } from 'src/app/service/joint-design.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { FileuploadService } from '@src/app/service/fileupload.service';
import { ImageDialogComponent } from '@src/app/dashboard/image-dialog/image-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication.service';

declare var $: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-joint-design-dialog',
  templateUrl: './joint-design-dialog.component.html',
  styleUrls: ['./joint-design-dialog.component.scss']
})
export class JointDesignDialogComponent implements OnInit {
  jointDesignForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;
  logoName: any;
  selectedLogoFileName: string;
  selectedFiles: any;
  isImageUploded = false;
  submitted = false;
  decodedToken: any;
  servicename : any;
  orgid : any;


  constructor(public dialogRef: MatDialogRef<JointDesignDialogComponent>, private jointDesignService: JointDesignService,private authService: AuthenticationService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any, private fileUploadService: FileuploadService, private dialog: MatDialog) {
      this.element = parentData.element;
      this.jointDesignForm = new FormGroup({
        jd_id: new FormControl(this.element ? this.element.jd_id : '', [

        ]),
        refName: new FormControl(this.element ? this.element.refName : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),
        joint_type: new FormControl(this.element ? this.element.joint_type : 'V joint', [
          // Validators.required
        ]),
        product_type: new FormControl(this.element ? this.element.product_type : '', [
          // Validators.required,
        ]),
        backing: new FormControl(this.element ? this.element.backing : 'N/A', [
          // Validators.required
        ]),
        sides: new FormControl(this.element ? this.element.sides : '1', [
          // Validators.required,
        ]),
        throat_thickness: new FormControl(this.element ? this.element.throat_thickness : 'N/A', [
          // Validators.required,
        ]),
        torch_angle: new FormControl(this.element ? this.element.torch_angle : '60', [
          // Validators.required,
        ]),
        stick_out_length: new FormControl(this.element ? this.element.stick_out_length : '15', [
          // Validators.required,
        ]),
        layers: new FormControl(this.element ? this.element.layers : '1', [
          // Validators.required,
        ]),
        welding_position: new FormControl(this.element ? this.element.welding_position : '1G', [
          // Validators.required,
        ]),
        technique: new FormControl(this.element ? this.element.technique : 'N/A', [
          // Validators.required,
        ]),
        joint_design_diagram: new FormControl(this.element ? this.element.joint_design_diagram : ''),
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
    this.decodedToken = this.authService.getUser();
    this.orgid= this.decodedToken.orgid;
  }

  get form() { return this.jointDesignForm.controls; }

  save() {
    console.log(this.jointDesignForm);
    this.jointDesignForm.markAllAsTouched();
    if (!this.jointDesignForm.invalid) {
      this.submitted = true;
      console.log(this.jointDesignForm);
      this.spinner.show();
      const jointValue = this.jointDesignForm.value;
      this.jointDesignService.createJointDesign(jointValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'JOINT_DESIGN_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'joint design Created Successfully !!');
                console.log(response.data);
                this.dialogRef.close();
                this.spinner.hide();
            }
          }
        }
      );
    }
  }

  update() {
    this.jointDesignForm.markAllAsTouched();
    if (!this.jointDesignForm.invalid) {
      this.submitted = true;
      this.spinner.show();
      const jointValue = this.jointDesignForm.value;
      console.log(jointValue);
      this.jointDesignService.updateJointDesign(jointValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'JOINT_DESIGN_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Joint design Updated Successfully !!');
                console.log(response.data);
                this.dialogRef.close();
                this.spinner.hide();
            }
          }
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  uploadFile(event) {
    this.servicename = this.decodedToken.service;
    console.log(this.servicename);
    
    console.log(event);
    console.log(event.target.files);

    this.logoName = event.target.files[0].name;
    console.log(this.logoName);

    if (this.servicename === 'cloud'){
      this.selectedFiles = event.target.files;
      this.azureUpload(this.logoName, this.selectedFiles);
    }
    else{
      this.selectedLogoFileName = 'JD_' +'org_'+this.orgid+'_'+Date.now() + '.' + event.target.files[0].name.split('.')[1];
      const file = event.target.files;
      this.selectedFiles = file;
      console.log(this.selectedLogoFileName);
      console.log(this.selectedFiles);
      this.upload(this.selectedLogoFileName, this.selectedFiles);
    }
  }

  upload(fileName, file) {
    console.log('-=-=-=-=');
    // this.uploading = true;
    const currentFileUpload = file.item(0);
    // currentFileUpload.name=fileName
    this.fileUploadService.uploadFile(currentFileUpload, fileName).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'UPLOAD_SUCCESSFULLY') {
              this.errorMsg = '';
              this.jointDesignForm.patchValue({
                joint_design_diagram : response.path
              });
              this.isImageUploded = true;
              console.log(this.jointDesignForm);
          }
        }
    });
  }

  azureUpload(fileName, file) {
    console.log('-=-=-=-=');
    // this.uploading = true;
    this.spinner.show();
    const currentFileUpload = file.item(0);
    // currentFileUpload.name=fileName
    this.fileUploadService.uploadazureFile(currentFileUpload, fileName).subscribe(
      response => {
        this.spinner.hide();
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'UPLOAD_SUCCESSFULLY') {
              this.errorMsg = '';
              console.log(response);
              this.jointDesignForm.patchValue({
                joint_design_diagram : response.path
              });
              this.isImageUploded = true;
              console.log(this.jointDesignForm);
          }
        }
    });
  }

  showImage() {
    const url = this.jointDesignForm.value.joint_design_diagram;
    console.log(url);
    if(this.decodedToken.service === 'cloud'){
      this.openImageDialog(url);
    }else{
      this.createSourceURL(url);
    }
  }

  createSourceURL(url) {
    this.fileUploadService.createURL(url).subscribe(
      res => {
        console.log(res);
        const reader = new FileReader();
        reader.readAsDataURL(res);
        const that = this;
        reader.onloadend = () => {
            const base64data = reader.result;
            that.imageDialog(base64data);
        };
      }
    );
  }

  imageDialog(element) {
    const img = new Image();
    let imgWidth;
    let imgHeight;
    img.src = element;
    img.onload = () => {
      imgWidth = img.naturalWidth;
      imgHeight = img.naturalHeight;

      console.log('imgWidth: ', imgWidth);
      console.log('imgHeight: ', imgHeight);
    };
    this.openImageDialog(element);
  }

  openImageDialog(element,imgWidth?,imgHeight?){
    const dialogRef = this.dialog.open(ImageDialogComponent, {
      width: imgWidth,
      height: imgHeight,
      data: {
        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  jointDesignPressEnter(){
    this.element ? this.update() : this.save();
  }
}
