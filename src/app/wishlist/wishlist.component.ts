import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
products: Array<IProduct> = [];

@Input() productToDisplay: IProduct = null;
selectedProduct: IProduct;
loggedInUserEmail: string;

  constructor(protected productService: ProductService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(){
    this.productService
    .getAllWish(this.loggedInUserEmail)
    .then((result: Array<any>)=>{
      this.products = result;
      console.log(this.products);
    });
  }

  onDeleteFromWishlist(index: number) {
    this.productService
    .deleteFromWishlist(this.loggedInUserEmail, this.products[index])
    .then((result) => {
      console.log(result);
      this.products.splice(index, 1);
    })
    .catch(error => {
      console.log(error);
    })
  }

}
