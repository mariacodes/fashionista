export interface IWish {
    _id?: string;
    name: string;
    price: string;
    fashionimage: string;
  }
  
  export class Wish implements IWish {
    constructor(
      public name: string,
      public price: string,
      public fashionimage: string,
      public _id?: string
    ) {
      this._id = _id ? _id : null;
      this.name = name;
      this.price = price;
      this.fashionimage = fashionimage;
    }
  }