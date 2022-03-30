import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { JointDesignService } from 'src/app/service/joint-design.service';
import { JointDesignDialogComponent } from 'src/app/dashboard/joint-design-dialog/joint-design-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FileuploadService } from 'src/app/service/fileupload.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-joint-design',
  templateUrl: './joint-design.component.html',
  styleUrls: ['./joint-design.component.scss']
})
export class JointDesignComponent implements OnInit {
  //removed joint design image
  //displayedColumns: string[] = ['refName', 'joint_type', 'product_type', 'backing', 'sides', 'throat_thickness', 'torch_angle', 'stick_out_length', 'layers', 'welding_position', 'technique', 'joint_design_diagram', 'action'];
  displayedColumns: string[] = ['refName', 'joint_type', 'product_type', 'backing', 'sides', 'throat_thickness', 'torch_angle', 'stick_out_length', 'layers', 'welding_position', 'technique', 'action'];

  dataSource;
  errorMsg: string;
  decodedToken: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private jointDesignService: JointDesignService, private toaster: ToastrService, private spinner: NgxSpinnerService,
              private fileUploadService: FileuploadService,private authService: AuthenticationService) { }

  ngOnInit() {
    this.getJointDesign();
  }

  view_edit(element) {
    console.log(element);
    this.addNewJointDesign(element);

  }

  getJointDesign() {
    this.spinner.show();
    this.jointDesignService.getJointDesign().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_JOINT_DESIGN_LIST_FOUND') {
          this.spinner.hide();
          console.log('no joint design found');
        } else if (res.message === 'JOINT_DESIGN_LIST') {
            this.errorMsg = '';
            console.log('------getJointDesignDetails------');
            // console.log(res.data);
            this.spinner.hide();
            if (res.data != null) {
            this.dataSource = new MatTableDataSource<any>(res.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.dataSource);
            }
        }
      }
    );
  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const jdid = element.jd_id;
    this.jointDesignService.deleteJointDesign(jdid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'JOINT_DESIGN_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Joint design Deleted Successfully !!');
            console.log(response.data);
            this.getJointDesign();
           }
        }
      }
    );
  }

  addNewJointDesign(element ?) {
    const dialogRef = this.dialog.open(JointDesignDialogComponent, {
      width: '94vh',
      height: '82vh',
      data: {
        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getJointDesign();
    });
  }


  showImage(url) {
    console.log(url);
    this.decodedToken = this.authService.getUser();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
