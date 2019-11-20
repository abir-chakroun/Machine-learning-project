import { Component, OnInit } from '@angular/core';
import { PropositionsService } from './propositions.service';
import { Proposition } from './proposition';
import { Observable, from } from  "rxjs/";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PropositionsService],

})
export class AdminComponent implements OnInit {
  propositions:Proposition[] ;
  c:boolean;
  a:boolean;
  r:boolean;
  h:boolean;
  u:boolean;

  constructor(private propositionService: PropositionsService,private http: HttpClient) { }

  ngOnInit() {
    this.c=false;
    this.a=false;
    this.r=false;
    this.u=false;
    this.h=true;
    this.propositions=[];
    this.http.get<Proposition[]>("http://localhost:5000/users/Showproposition").subscribe(propositions =>this.propositions = propositions);
     
    }
    deleteproposition(id:any)
    {
      console.log(id);
      this.propositionService.bloqueproposition(id).subscribe(
        () => {
          console.log("ok")
        },
        err => {
            console.error(err)
        }
    )

}
confirmeproposition(proposition:Proposition)
{
  console.log(proposition);
  this.propositionService.addproposition(proposition).subscribe(
    () => {
      console.log("ok")
    },
    err => {
        console.error(err)
    }
)
}
    


admin(){
  this.h=false;
  this.u=false;
  this.c=false;
  this.r=false;
  this.a=true;
}
relance(){
  this.h=false;
  this.u=false;
  this.c=false;
  this.r=true;
  this.a=false;
}
classifier(){
  this.h=false;
  this.u=false;
  this.c=true;
  this.r=false;
  this.a=false;
}
users(){
  this.h=false;
  this.u=true;
  this.c=false;
  this.r=false;
  this.a=false;

}
home(){
  this.h=true;
  this.u=false;
  this.c=false;
  this.r=false;
  this.a=false;
}


}
