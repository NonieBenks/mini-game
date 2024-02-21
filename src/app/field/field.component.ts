import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { finalize, map, take, tap, timer } from 'rxjs';

import { CellComponent } from '../cell/cell.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-field',
  standalone: true,
  imports: [CellComponent, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
})
export class FieldComponent {
  columns = Array.from({ length: 10 });
  rows = Array.from({ length: 10 });
  computerSteps: Array<string> = [];

  nameOfTheWinner: string = '';
  activeCell: string = '';
  results: string = '';
  amountOfTime: number = 0;
  playerCount: number = 0;
  computerCount: number = 0;

  constructor(private elementRef: ElementRef, public dialog: MatDialog) {}

  ngOnInit() {
    this.generateComputerMovesArray();
  }

  public startGame(amountOfTime: number) {
    timer(0, amountOfTime)
      .pipe(
        take(this.computerSteps.length),
        map((index) => this.computerSteps[index]),
        tap((currentCoordinates) => {
          const pickedCell = this.elementRef.nativeElement.querySelector(
            `[coordinates = "${currentCoordinates}"]`
          );
          this.activeCell = currentCoordinates;
          this.pickCell(pickedCell, this.amountOfTime);
        }),
        finalize(() => {
          setTimeout(() => {
            this.nameOfTheWinner =
              this.playerCount > this.computerCount ? 'Гравець' : "Комп'ютер";
            this.results = `Гравець ${this.playerCount}:${this.computerCount} Комп'ютер`;
            this.openDialog();
          }, amountOfTime);
        })
      )
      .subscribe();
  }

  pickCell(cell: HTMLElement, amountOfTime: number) {
    cell.style.backgroundColor = 'yellow';
    setTimeout(() => {
      if (cell.style.backgroundColor === 'yellow') {
        cell.style.backgroundColor = 'red';
      }
      this.updateCount(cell.style.backgroundColor);
    }, amountOfTime);
  }

  updateCount(color: string) {
    if (color === 'red') {
      this.computerCount++;
    } else {
      this.playerCount++;
    }
  }

  generateComputerMovesArray() {
    while (this.computerSteps.length < 10) {
      let generatedValue =
        Math.floor(Math.random() * 10) + '-' + Math.floor(Math.random() * 10);
      if (!this.computerSteps.includes(generatedValue)) {
        this.computerSteps.push(generatedValue);
      }
    }
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        name: this.nameOfTheWinner,
        results: this.results,
      },
    });
  }
}
