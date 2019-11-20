import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user';
import { Observable } from  "rxjs/";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.css'],
 providers:[],
})
//export class UsersComponent implements OnInit {

  //constructor() { }

  //ngOnInit() {
  //}

//}

//@Component({
  //selector: 'app-admin',
 // templateUrl: './admin.component.html',
 // styleUrls: ['./admin.component.scss'],
 // providers: [UsersService] 

//})
export class UsersComponent implements OnInit {

  users:User[] ;
  c:boolean;

  constructor(private usersService: UsersService,private http: HttpClient) { }

  ngOnInit() {
    this.c=false;
    this.users=[];
    this.http.get<User[]>("http://localhost:5000/users/Showuser").subscribe(users =>this.users = users);
     
    }
adduser(user:User){
  console.log(user);
  this.usersService.adduser(user).subscribe(
    () => {
      console.log("ok")
    },
    err => {
        console.error(err)
    }
)
}
Bloqueuser(id:any){
  console.log(id);
  this.usersService.bloqueuser(id).subscribe(
    () => {
      console.log("ok")
    },
    err => {
        console.error(err)
    }
)

}
//bloquer(user:User){
  //console.log(user);
  //  this.deleteservice.delete(user).subscribe(
    //    () => {
            
      //  },
      //  err => {
        //    console.error(err)
       // }
    //)
//}
  

}



