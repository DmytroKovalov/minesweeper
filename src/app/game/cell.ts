
enum Status
{
  Close,
  Open,
  Marked
}

export class Cell
{
  status: Status = Status.Close;
  mine: boolean = false;
  count: number = 0;
  constructor(public x: number, public y: number)
  {

  }
}