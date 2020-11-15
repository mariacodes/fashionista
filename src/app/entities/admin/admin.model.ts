export interface IAdmin {
    _id?: string;
    type: string;
    Fname: string;
    Lname: string;
    pass: string;
  }
  
export class Admin implements IAdmin {
  constructor(
      public type: string,
      public Fname: string,
      public Lname: string,
      public pass: string,
      public _id?: string
    
  ) {
    this._id = _id ? _id : null;
    this.type= type;
    this.Fname = Fname;
    this.Lname = Lname;
    this.pass = pass;
  }
}