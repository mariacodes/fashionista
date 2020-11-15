import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  products: Array<IProduct> = [];
  @Input() productToDisplay: IProduct = null;
  selectedProduct: IProduct;
  loggedInUserEmail: string;

  constructor(protected productService: ProductService) { }



  ngOnInit(): void {
    this.loadAll();
  }

   // Load all products.
   private loadAll() {
    this.productService
      .getAllCart(this.loggedInUserEmail)
      .then((result: Array<any>) => {
        this.products = result;
        console.log(this.products);
      });
  }

  onDeleteFromCart(index: number) {
    console.log('firing onDeleteFromCart');
    console.log(this.products[index]);
    this.productService
      .deleteFromCart(this.loggedInUserEmail, this.products[index])
      .then((result) => {
        console.log(result);
        this.products.splice(index, 1);
      })
      .catch(err => {
        console.log(err);
      })
  }

}
