import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss',
})
export class CellComponent {
  public backgroundColor: string = '#9AC4F8';
  @Input() coordinates: string = '';
  @Input() activeCell: string = '';

  turnGreen() {
    this.backgroundColor = '#8AEA92';
  }
}
