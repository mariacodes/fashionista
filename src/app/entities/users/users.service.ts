import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { IUser, User } from './users.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = '/api/users';

    constructor(private http: Http) { }

    // Get products
    get(): Promise<Array<IUser>> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }

    // Create product
    create(user: User): Promise<IUser> {
        return this.http.post(this.usersUrl, user)
            .toPromise()
            .then(response => response.json())
            .catch(this.error);
    }
    
    // Delete a product
    delete(id: string): Promise<any> {
        return this.http.delete(`${this.usersUrl}/${id}`)
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