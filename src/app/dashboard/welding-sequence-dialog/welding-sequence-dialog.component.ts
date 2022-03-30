import { Component, OnInit, Inject  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { WeldingSequenceService } from 'src/app/service/welding-sequence.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { FileuploadService } from '@src/app/service/fileupload.service';
import { ImageDialogComponent } from '@src/app/dashboard/image-dialog/image-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-welding-sequence-dialog',
  templateUrl: './welding-sequence-dialog.component.html',
  styleUrls: ['./welding-sequence-dialog.component.scss']
})
export class WeldingSequenceDialogComponent implements OnInit {
  weldingSequenceForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;
  logoName: any;
  selectedLogoFileName: string;
  selectedFiles: any;
  isImageUploded = false;
  decodedToken: any;
  orgid: any;
  servicename : any;

  constructor(public dialogRef: MatDialogRef<WeldingSequenceDialogComponent>, private weldingSequenceService: WeldingSequenceService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any, private fileUploadService: FileuploadService,private authService: AuthenticationService, private dialog: MatDialog) {
      this.element = parentData.element;
      this.weldingSequenceForm = new FormGroup({
        ws_id: new FormControl(this.element ? this.element.ws_id : '', [

        ]),
        refName: new FormControl(this.element ? this.element.refName : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),
        back_gouging: new FormControl(this.element ? this.element.back_gouging : 'N/A', [
          Validators.required
        ]),
        track_welding_proc: new FormControl(this.element ? this.element.track_welding_proc : 'N/A', [
          Validators.required,
        ]),
        backing: new FormControl(this.element ? this.element.backing : 'N/A', [
          Validators.required
        ]),
        mode_of_metal_transfer: new FormControl(this.element ? this.element.mode_of_metal_transfer : 'Spray', [
          Validators.required,
        ]),
        flux_designation: new FormControl(this.element ? this.element.flux_designation : 'N/A', [
          Validators.required,
        ]),
        joint_preparation_and_cleaning: new FormControl(this.element ? this.element.joint_preparation_and_cleaning : 'OK', [
          Validators.required,
        ]),
        tungsten_electrode: new FormControl(this.element ? this.element.tungsten_electrode : 'N/A', [
          Validators.required,
        ]),
        welding_seq_diagram: new FormControl(this.element ? this.element.welding_seq_diagram : '', [
//           Validators.required,
        ])
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
    this.decodedToken = this.authService.getUser();
    console.log(this.decodedToken.orgid);
    this.orgid= this.decodedToken.orgid;
  }

  get form() { return this.weldingSequenceForm.controls; }

  save() {
    this.weldingSequenceForm.markAllAsTouched();
    console.log(this.weldingSequenceForm.invalid);
    console.log(this.weldingSequenceForm);
    if (!this.weldingSequenceForm.invalid) {
      console.log(this.weldingSequenceForm);
      this.spinner.show();
      const sequenceValue = this.weldingSequenceForm.value;
      this.weldingSequenceService.createWeldingSequence(sequenceValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'WELDING_SEQUENCE_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Welding Sequence Created Successfully !!');
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
    this.weldingSequenceForm.markAllAsTouched();
    if (!this.weldingSequenceForm.invalid) {
      this.spinner.show();
      const sequenceValue = this.weldingSequenceForm.value;
      console.log(sequenceValue);
      this.weldingSequenceService.updateWeldingSequence(sequenceValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'WELDING_SEQUENCE_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Welding Sequence Updated Successfully !!');
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
      this.selectedLogoFileName = 'WS_' +'org_'+this.orgid+'_'+Date.now() + '.' + event.target.files[0].name.split('.')[1];
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
              console.log(response);
              this.weldingSequenceForm.patchValue({
                welding_seq_diagram : response.path
              });
              this.isImageUploded = true;
              console.log(this.weldingSequenceForm);
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
              this.weldingSequenceForm.patchValue({
                welding_seq_diagram : response.path
              });
              this.isImageUploded = true;
              console.log(this.weldingSequenceForm);
          }
        }
    });
  }

  showImage() {
    const url = this.weldingSequenceForm.value.welding_seq_diagram;
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

  weldSeqPressEnter(){
    this.element ? this.update() : this.save();
  }
}

