import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser, User } from '../entities/users/users.model';
import { UserService } from '../entities/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userForm: FormGroup;
  email : string='';
  Fname: string = '';
  Lname: string = '';
  pass: string = '';
  error: boolean = false;

  @Output() createdUser = new EventEmitter<IUser>();
 
  constructor(protected userService: UserService, protected formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm()

  }
  onSubmit() {
    const user = new User(this.userForm.value['email'], this.userForm.value['Fname'], this.userForm.value['Lname'], this.userForm.value['pass']);
    console.log(user);
    this.userService.create(user).then((result: IUser) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.createdUser.emit(result);
        this.router.navigate(['profile']);
      }
    });

  }

  hideError() {
    this.error = false;
  }
  private initForm() {
    this.userForm = new FormGroup({
      email: new FormControl(this.email,Validators.required),
      Fname: new FormControl(this.Fname, Validators.required),
      Lname: new FormControl(this.Lname, Validators.required),
      pass: new FormControl(this.pass, Validators.required)
    });
  }


}


