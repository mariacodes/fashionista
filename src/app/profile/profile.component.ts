import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ProductService } from 'src/app/entities/product/product.service';
import { IProduct } from 'src/app/entities/product/product.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
      .get()
      .then((result: Array<IProduct>) => {
        this.products = result;
        console.log(this.products);
      });
  }

  onSubmit(index: number) {
    console.log('firing onsubmit for add to cart.');
    this.selectedProduct = this.products[index];
    console.log(this.selectedProduct);
    this.productService.postToCart(this.loggedInUserEmail, this.selectedProduct)
      .then((result: any) => {
        console.log(result);
        console.log('succesfully sent to server!')
      });
  }

  onSubmitWish(index: number){
    console.log('firing onsubmit for wishlist')
    this.selectedProduct = this.products[index];
    this.productService.postToWish(this.loggedInUserEmail, this.selectedProduct)
      .then((result: any)=>{
        console.log(result);
        console.log('successfully sent to server!')
      })
  }
}
