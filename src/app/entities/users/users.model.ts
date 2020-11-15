export interface IUser {
    _id?: string;
    email: string;
    Fname: string;
    Lname: string;
    pass: string;
  }
  
  export class User implements IUser {
    constructor(
        public email: string,
        public Fname: string,
        public Lname: string,
        public pass: string,
        public _id?: string
      
    ) {
      this._id = _id ? _id : null;
      this.email= email;
      this.Fname = Fname;
      this.Lname = Lname;
      this.pass = pass;
    }
  }