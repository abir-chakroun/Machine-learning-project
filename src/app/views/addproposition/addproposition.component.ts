 // import { Component, OnInit } from '@angular/core';
//import { Proposition } from '../Admin/proposition';
//import { HttpClient } from '@angular/common/http';
//import { from } from 'rxjs';
//@Component({
 // selector: 'app-addproposition',
 // templateUrl: './addproposition.component.html',
 // styleUrls: ['./addproposition.component.scss']
//})
//export class AddpropositionComponent implements OnInit {
 // proposition:Proposition ;
  //c:number  

  //constructor(private http: HttpClient) { }

  //ngOnInit() {
    //this.proposition=new Proposition();
//    this.proposition.Contenu="hahah";
  //  this.proposition.titre="hahah";
//    this.proposition.label="true";
  //}
//test(){
//  this.http.post("http://localhost:5000/users/Addproposition",JSON.stringify(this.proposition)).subscribe(
  //  data  => {
    //console.log("POST Request is successful ", data);
//    },
  //  error  => {
    
//    console.log("Error", error);
    
  //  }

//    );
//  console.log('test');
//}
//}
import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Pro, AddpropositionService } from './addproposition.service';

@Component({
   selector: 'app-addproposition',
  templateUrl: './addproposition.component.html',
  styleUrls: ['./addproposition.component.css'],
  providers:[AddpropositionService],
})
export class AddpropositionComponent {
  proposition: Pro = {
    id: 0,
    titre: '',
    Contenu: '',
    label: '',

}
s:boolean;

constructor(private auth: AddpropositionService, private router: Router) { }

addproposition()  {
    this.auth.addproposition(this.proposition).subscribe(
        () => {
            this.router.navigateByUrl('/dashboard')
        },
        err => {
            console.error(err)
        }
    )
}
send(){
  this.s=true;
}
close(){
  this.s=false;
}

}
