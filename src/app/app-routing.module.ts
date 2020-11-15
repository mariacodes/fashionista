import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainpageComponent} from './mainpage/mainpage.component';
import { UsersComponent } from './users/users.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent} from './product/product.component';
import { WishlistComponent} from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: MainpageComponent},
  { path: 'users', component: UsersComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'product', component: ProductComponent},
  { path: 'wishlist', component: WishlistComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'shoppingcart', component: ShoppingcartComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [ MainpageComponent, UsersComponent, AdminComponent, ProductComponent, WishlistComponent,ProductComponent, ShoppingcartComponent, LoginComponent]
