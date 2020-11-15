import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IProduct, Product } from './product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = '/api/products';
    private usersUrl = '/api/users';
    private shoppingCartSuffix = '/shoppingcart';
    private wishlistUrl = '/wishlist';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IProduct>> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    create(product: Product): Promise<IProduct> {
        return this.http.post(this.productsUrl, product)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Delete a product
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.productsUrl}/${id}`)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Error handling
    private error(error: any) {
        let message = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(message);
    }

    // add to cart
    postToCart(userId: string, product: IProduct): Promise<IProduct> {
        return this.http.post(`${this.usersUrl}/${userId}${this.shoppingCartSuffix}/add`, product)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }

    getAllCart(userId: string): Promise<Array<any>>{
        return this.http.get(`${this.usersUrl}/${userId}${this.shoppingCartSuffix}/get`)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }

    deleteFromCart(userId: string, product: IProduct): Promise<any> {
        let productId = product._id;
        return this.http.delete(`${this.usersUrl}/${userId}${this.shoppingCartSuffix}/${productId}`)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }

    // add to wish list
    // add to cart
    postToWish(userId: string, product: IProduct): Promise<IProduct> {
        return this.http.post(`${this.usersUrl}/${userId}${this.wishlistUrl}/add`, product)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }

    getAllWish(userId: string): Promise<Array<any>>{
        return this.http.get(`${this.usersUrl}/${userId}${this.wishlistUrl}/get`)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }

    deleteFromWishlist(userId: string, product: IProduct): Promise<any> {
        let productId = product._id;
        return this.http.delete(`${this.usersUrl}/${userId}${this.wishlistUrl}/${productId}`)
        .toPromise()
        .then(response => response.json())
        .catch(this.error);
    }


}

/// "test" + variable + "test"
/// `test${variable}test`