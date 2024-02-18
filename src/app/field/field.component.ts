import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CellComponent, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  rows = Array.from({ length: 10 });
  columns = Array.from({ length: 10 });
  pickedCoordinates: string[] = [];
  generatedCoordinates = '';
  amountOfTime = 0;
  playerCount = 0;
  computerCount = 0;

  constructor(private elementRef: ElementRef) {}

  public startGame(N: number) {
    const pickedCell = this.elementRef.nativeElement.querySelector(
      `[coordinates = "${this.generatedCoordinates}"]`
    );
    this.generatedCoordinates = this.generateCoordinates();

    while (this.pickedCoordinates.includes(this.generatedCoordinates)) {
      this.generatedCoordinates = this.generateCoordinates();
    }
    this.pickedCoordinates.push(this.generatedCoordinates);

    pickedCell.style.backgroundColor = 'yellow';

    setInterval(() => {
      if (pickedCell.style.backgroundColor === 'yellow') {
        pickedCell.style.backgroundColor = 'red';
      }
      this.updateCount(pickedCell.style.backgroundColor);
    }, N);
  }

  makeAMove() {}

  updateCount(color: string) {
    if (color === 'red') {
      this.computerCount++;
    } else {
      this.playerCount++;
    }
  }

  generateCoordinates(): string {
    return (
      Math.floor(Math.random() * 10) + '-' + Math.floor(Math.random() * 10)
    );
  }
}
