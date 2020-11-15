export interface IProduct {
  _id?: string;
  name: string;
  brand: string;
  price: string;
  email: string;
  avaibility: string;
  fashionimage: string;
}

export class Product implements IProduct {
  constructor(
    public name: string,
    public brand: string,
    public price: string,
    public email: string,
    public avaibility: string,
    public fashionimage: string,
    public _id?: string
  ) {
    this._id = _id ? _id : null;
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.email = email;
    this.avaibility = avaibility;
    this.fashionimage = fashionimage;
  }
}