import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import {AbstractControl, ValidatorFn} from '@angular/forms';
import { Admin, IAdmin } from '../entities/admin/admin.model';
import { AdminService } from '../entities/admin/admin.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminForm: FormGroup;
  type: string='';
  Fname: string = '';
  Lname: string = '';
  pass: string = '';
  error: boolean = false;

  @Output() createdAdmin = new EventEmitter<IAdmin>();
 
  constructor(protected adminService: AdminService, protected formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm()

  }
  onSubmit() {
    const admin = new Admin(this.adminForm.value['type'], this.adminForm.value['Fname'], this.adminForm.value['Lname'], this.adminForm.value['pass']);
    this.adminService.create(admin).then((result: IAdmin) => {
      if (result === undefined) {
        this.error = true;
      } else {
        this.error = false;
        this.createdAdmin.emit(result);
        this.router.navigate(['product']);
      }
    });

  }

  hideError() {
    this.error = false;
  }
  private initForm() {
    this.adminForm = new FormGroup({
      type: new FormControl(this.type,[ Validators.required,Validators.pattern(/admin[0-9]+/)]),
      Fname: new FormControl(this.Fname, Validators.required),
      Lname: new FormControl(this.Lname, Validators.required),
      pass: new FormControl(this.pass, Validators.required)
    });
  }


}