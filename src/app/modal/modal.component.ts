import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  results: string;
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; results: string }
  ) {}

  startOver() {
    window.location.reload();
  }
}
