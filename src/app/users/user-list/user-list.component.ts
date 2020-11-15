import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from 'src/app/entities/users/users.service';
import { IUser } from 'src/app/entities/users/users.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  users: Array<IUser> =[];
  @Input() userToDisplay: IUser = null;

  constructor(protected userService: UserService) { }

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnChanges(): void{
    if(this.userToDisplay != null){
      this.users.push(this.userToDisplay);
    }
  }

  delete(id: string){
    this.userService.delete(id).then((result : any)=> this.loadAll());
  }
  
  //Loads all users
  private loadAll(){
    this.userService
    .get()
    .then((result: Array<IUser>)=>{
      this.users = result;
    });
  }

}
