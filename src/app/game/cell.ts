
export enum Status
{
  close,
  open,
  marked
}

export class Cell
{
  status: Status = Status.close;
  mine: boolean = false;
  count: number = 0;
  constructor(public y: number, public x: number)
  {

  }
}