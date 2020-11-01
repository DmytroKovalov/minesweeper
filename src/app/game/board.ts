import { asNativeElements } from '@angular/core';
import { Cell, Status } from "./cell";

export class Board
{
  cells: Cell[][];
  mines: Set<Cell>;

  private directions: number[][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  constructor(private width: number, private height: number, private minesCount: number)
  {
    this.initBoard();
  }

  initBoard(): void
  {
    //create cells
    this.cells = [];
    for (let i = 0; i < this.height; ++i)
    {
      this.cells[i] = [];
      for (let j = 0; j < this.width; ++j)
      {
        this.cells[i].push(new Cell(i, j));
      }
    }

    //generate mines
    this.mines = new Set();
    while (this.mines.size < this.minesCount)
    {
      let x = Math.floor(Math.random() * this.width);
      let y = Math.floor(Math.random() * this.height);
      this.cells[y][x].mine = true;
      this.mines.add(this.cells[y][x]);
    }

    //count number of neigbours
    for (let i = 0; i < this.height; ++i)
    {
      for (let j = 0; j < this.width; ++j)
      {
        let cell = this.cells[i][j];
        cell.setCount(cell.mine ? 0 : this.calcNeigbours(i, j));
      }
    }
  }

  calcNeigbours(i: number, j: number): number
  {
    let count: number = 0;
    this.directions.forEach(dir =>
    {
      let y = i + dir[0];
      let x = j + dir[1];
      if (this.cells[y] && this.cells[y][x] && this.cells[y][x].mine)
      {
        ++count;
      }
    });
    console.log("count = " + count);
    return count;
  }

  newGame(width: number, height: number, minesCount: number): void
  {
    this.width = width;
    this.height = height;
    this.minesCount = minesCount;
    this.initBoard();
  }

  getCountOfEmptyCells(): number
  {
    return this.width*this.height - this.minesCount;
  }

  openAllMines(): void
  {
    this.mines.forEach(cell => 
    {
      cell.status = Status.open;
    });
  }

  openAllEmptyNeighbours(cell: Cell): number
  {
    let count: number = 0;
    this.directions.forEach(dir =>
    {
      let y = cell.y + dir[0];
      let x = cell.x + dir[1];
      if (this.cells[y] && this.cells[y][x] && this.cells[y][x].status != Status.open)
      {
        this.cells[y][x].status = Status.open;
        ++count;
        if (this.cells[y][x].count == 0 )
        {
          count += this.openAllEmptyNeighbours(this.cells[y][x]);
        }
      }
    });
    return count;
  }
}