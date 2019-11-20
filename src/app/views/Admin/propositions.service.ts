import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proposition } from './proposition';
@Injectable({
  providedIn: 'root'
})
export class PropositionsService {  

  constructor(private http: HttpClient) { }
  getPropositions() {
    return this.http.get('http://localhost:5000/users/Showproposition');
}
bloqueproposition(_id:any){
  return this.http.post('http://localhost:5000/users/Bloqueproposition', _id)
}
addproposition(proposition:Proposition){
return this.http.post('http://localhost:5000/users/Confirmeproposition', proposition)
}
}
