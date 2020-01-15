import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';

export interface DialogData {
  question: string;
}

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
    entryComponents: []
  })

  export class ConfirmationDialog {
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }