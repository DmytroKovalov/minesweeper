import { Component } from '@angular/core';
import { Board } from './game/board';
import { Cell, Status } from './game/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'Minesweeper';
  board: Board;
  gridWidth: number = 10;
  gridHeight: number = 10;
  mines: number = 15;
  gameResult: 'Win' | 'Lose' | 'in progress' = 'in progress';

  private gameOver: boolean = false;
  private emptyCells: number; 

  constructor()
  {
    this.board = new Board(this.gridWidth, this.gridHeight, this.mines);
    this.emptyCells = this.board.getCountOfEmptyCells();
  }

  newGame(): void
  {
    this.gameResult = 'in progress';
    this.gameOver = false;
    this.board.newGame(this.gridWidth, this.gridHeight, this.mines);
    this.emptyCells = this.board.getCountOfEmptyCells();
  }

  checkCell(cell: Cell): void
  {
    if (this.gameOver) return;
    cell.status = Status.open;
    if (cell.mine)
    {
      this.gameOver = true;
      this.gameResult = 'Lose';
      this.board.openAllMines();
    }
    else
    {
      this.emptyCells--;
      if (cell.count == 0)
      {
        this.emptyCells -= this.board.openAllEmptyNeighbours(cell);
      }

      if (this.emptyCells == 0) 
      {
        this.gameOver = true;
        this.gameResult = 'Win';
      }
    }
  }
}
