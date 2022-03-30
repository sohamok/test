import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  imageSrc: any;

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public parentData: any, ) {
      console.log(parentData);
      this.imageSrc = parentData.element;
      // this.imageSrc = 'https://smartweldimageupload.blob.core.windows.net/smartweld-container/5815011429453898-WS_1627624482999.jpg'
    }

  ngOnInit(): void {
  } 

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
