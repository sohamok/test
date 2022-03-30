import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { WeldingSequenceService } from 'src/app/service/welding-sequence.service';
import { WeldingSequenceDialogComponent } from 'src/app/dashboard/welding-sequence-dialog/welding-sequence-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { FileuploadService } from 'src/app/service/fileupload.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-welding-sequence',
  templateUrl: './welding-sequence.component.html',
  styleUrls: ['./welding-sequence.component.scss']
})
export class WeldingSequenceComponent implements OnInit {
  //turned off welding_seq_diagram
  //displayedColumns: string[] = ['refName', 'back_gouging', 'track_welding_proc', 'backing', 'mode_of_metal_transfer', 'flux_designation', 'joint_preparation_and_cleaning', 'tungsten_electrode', 'welding_seq_diagram', 'action'];
  displayedColumns: string[] = ['refName', 'back_gouging', 'track_welding_proc', 'backing', 'mode_of_metal_transfer', 'flux_designation', 'joint_preparation_and_cleaning', 'tungsten_electrode', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;
  decodedToken: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private weldingSequenceService: WeldingSequenceService, private toaster: ToastrService,
              private spinner: NgxSpinnerService, private fileUploadService: FileuploadService, private authService: AuthenticationService,) { }

  ngOnInit() {
    this.getWeldingSequence();
  }

  view_edit(element) {
    console.log(element);
    this.addNewWeldingSequence(element);

  }

  getWeldingSequence() {
    this.spinner.show();
    this.weldingSequenceService.getWeldingSequence().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_WELDING_SEQUENCE_LIST_FOUND') {
          this.spinner.hide();
          console.log('no welding sequence found');
        } else if (res.message === 'WELDING_SEQUENCE_LIST') {
            this.errorMsg = '';
            console.log('------getWeldingSequenceDetails------');
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
    const wsid = element.ws_id;
    this.weldingSequenceService.deleteWeldingSequence(wsid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'WELDING_SEQUENCE_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Welding sequence Deleted Successfully !!');
            console.log(response.data);
            this.getWeldingSequence();
           }
        }
      }
    );
  }

  addNewWeldingSequence(element ?) {
    const dialogRef = this.dialog.open(WeldingSequenceDialogComponent, {
      width: '94vh',
      height: '55vh',
      data: {
        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getWeldingSequence();
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
