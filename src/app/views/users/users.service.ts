import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {  

  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get('http://localhost:5000/users/Showuser');
}
bloqueuser(_id:any){
  return this.http.post('http://localhost:5000/users/Bloqueuser', _id)
}
adduser(user:User){
return this.http.post('http://localhost:5000/users/adduser', user)
}
}




