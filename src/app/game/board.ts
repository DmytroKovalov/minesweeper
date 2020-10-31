import { Cell } from "./cell";

export class Board
{
  cells: Cell[][];

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
    let mines: Set<Cell> = new Set();
    while (mines.size < this.minesCount)
    {
      let x = Math.floor(Math.random() * this.width);
      let y = Math.floor(Math.random() * this.height);
      this.cells[y][x].mine = true;
      mines.add(this.cells[y][x]);
    }

    //count number of neigbours
    for (let i = 0; i < this.height; ++i)
    {
      for (let j = 0; j < this.width; ++j)
      {
        let cell = this.cells[i][j];
        if (cell.mine)
        {
          cell.count = -1;
        }
        else
        {
          cell.count = this.calcNeigbours(i, j);
        }
      }
    }
  }

  calcNeigbours(i: number, j: number): number
  {
    let count: number = 0;
    this.directions.forEach(row =>
    {
      let y = i + row[0];
      let x = j + row[1];
      if (this.cells[y] && this.cells[y][x] && this.cells[y][x].mine)
      {
        ++count;
      }
    });
    console.log("count = " + count);
    return count;
  }

  newGame(width: number, height: number): void
  {
    this.width = width;
    this.height = height;
    this.initBoard();
  }
}