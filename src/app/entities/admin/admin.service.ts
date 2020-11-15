import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Admin, IAdmin } from './admin.model';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private adminsUrl = '/api/admins';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IAdmin>> {
        return this.http.get(this.adminsUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    create(admin: Admin): Promise<IAdmin> {
        return this.http.post(this.adminsUrl, admin)
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
