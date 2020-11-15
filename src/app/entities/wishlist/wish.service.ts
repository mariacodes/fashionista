import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IWish, Wish } from './wish.model';


@Injectable({
    providedIn: 'root'
})
export class WishService {
    private wishsUrl = '/api/wishs';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IWish>> {
        return this.http.get(this.wishsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    create(wish: Wish): Promise<IWish> {
        return this.http.post(this.wishsUrl, wish)
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
}