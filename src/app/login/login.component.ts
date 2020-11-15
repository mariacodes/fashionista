import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../entities/users/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../entities/login/login.service';
import { Login } from '../entities/login/login.model';
import { IUser } from '../entities/users/users.model';
import { IAdmin } from '../entities/admin/admin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userType: string = '';
  userName: string = '';
  pass: string = '';
  error: boolean = false;

  userTypeStates = [
    {type: 'user', name: 'User'},
    {type: 'admin', name: 'Admin'}
  ]

  @Output() loggedInUser = new EventEmitter<IUser | IAdmin>();

  constructor(
    protected userService: UserService,
    protected formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  onSubmit() {
    console.log(this.loginForm);
    const loginObject = new Login(this.loginForm.value['userName'], this.loginForm.value['pass'], this.loginForm.value['userType']);
    console.log(loginObject);

    this.loginService.login(loginObject).then((result: IUser | IAdmin) => {
      if (!result) {
        this.error = true;
      } else {
        this.error = false;
        this.loggedInUser.emit(result);
        if (loginObject.userType === 'admin') {
          this.router.navigate(['product']);
        } else {
          this.router.navigate(['profile']);
        }
      }
    });
  }

  hideError() {
    this.error = false;
  }

  private initForm() {
    this.loginForm = new FormGroup({
      userType: new FormControl(this.userTypeStates[0].type, Validators.required),
      userName: new FormControl(this.userName, Validators.required),
      pass: new FormControl(this.pass, Validators.required)
    });
  }

}


