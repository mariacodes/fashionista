import { Injectable } from '@angular/core';
import { IUser, User } from '../users/users.model';
import { IAdmin, Admin } from '../admin/admin.model';
import { Http } from '@angular/http';
import { ILogin, Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authUrl = '/api/authenticate';

  constructor(private http: Http) { }

  login(loginObject: ILogin): Promise<IUser | IAdmin> {
    return this.http.post(this.authUrl, loginObject)
    .toPromise()
    .then((response) => response.json()).catch(this.error);
  }

  private error(error: any) {
    let message = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(message);
}
}
