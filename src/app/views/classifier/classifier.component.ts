import { Component, OnInit } from '@angular/core';
import { ClassifierService, Classifier } from './classifier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classifier',
  templateUrl: './classifier.component.html',
  styleUrls: ['./classifier.component.css'],
  providers:[ClassifierService],
})
export class ClassifierComponent implements OnInit {
 // c: Classifier = {
 //   i1:1,
 //   i2:1,
 //   i3:1,
//}
    c: Classifier ={
      svm:1,
      log:1,
      knn:1,
      dt:1,
      f:1,

}
n:boolean;
  kk: any;
  constructor(private auth: ClassifierService, private router: Router) { }

  ngOnInit() {
  }
  addClassifier()  {
    this.n=true
    this.auth.addClassifier(this.c).subscribe(a =>this.kk = a) // kk hiya objet  ili fiha il resultat 
    console.log(this.kk)
}
close()
{
  this.n=false
}
}
