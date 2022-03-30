import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message: string ;
  confirmButtonText: string;
  cancelButtonText: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    if (data) {
      this.message = data.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok ;
        this.cancelButtonText = data.buttonText.cancel;
      }
    }
  }
  ngOnInit() {

  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
