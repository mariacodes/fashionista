import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StatusService } from './shared/status.service';
import { IProduct } from './entities/product/product.model';
import { isPromise } from '@angular/compiler/src/util';
import { Router } from '@angular/router'
import { IAdmin, Admin } from './entities/admin/admin.model';
import { element } from 'protractor';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'node-express-angular';
  status = 'DOWN';
  createdProduct: IProduct = null;
  createdAdmin: IAdmin = null;
  userEmail = undefined;
  constructor(protected statusService: StatusService, public router: Router) { }

  // Get the server status when starting the view.
  ngOnInit() {
    this.statusService
      .getStatus()
      .then((result: any) => {
        this.status = result.status;
      });
  }

  // Get the new product created.
  onCreatedProduct(createdProduct: IProduct) {
    this.createdProduct = createdProduct;
  }

  onCreatedAdmin(createdAdmin: IAdmin) {
    this.createdAdmin = createdAdmin;
  }

  onActivate(elementRef) {
    if (elementRef instanceof UsersComponent) {
      elementRef.createdUser.subscribe(user => {
        this.userEmail = user.email;
      });
    }

    if (elementRef instanceof AdminComponent) {
      elementRef.createdAdmin.subscribe(admin => {
        this.userEmail = admin.type;
      })
    }

    if (elementRef instanceof LoginComponent) {
      elementRef.loggedInUser.subscribe(user => {
        if (user instanceof Admin) {
          this.userEmail = user.type;
        } else {
          this.userEmail = user.email
        }
      })
    }
    elementRef.loggedInUserEmail = this.userEmail;
  }

  onDeactivate($event){
    console.log($event);
  }

}
