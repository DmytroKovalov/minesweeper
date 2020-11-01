
export enum Status
{
  close,
  open,
  marked
}

export class Cell
{
  private styles: string[] = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  status: Status = Status.close;
  mine: boolean = false;
  count: number = 0;
  style: string = 'zero'
  constructor(public y: number, public x: number)
  {

  }

  setCount(count: number): void
  {
    this.count = count;
    this.style = this.styles[count];
  }

}