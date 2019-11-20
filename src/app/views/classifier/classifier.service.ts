import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'


export class Classifier{
    svm:number;
    log:number;
    dt:number;
    knn:number;
    f:number;
}
//export class Classifier {
  //  i1: number;
  //  i2:number;
   // i3:number;

//}

@Injectable()
export class ClassifierService {
    private url="http://localhost:5000/users/classifier"
    constructor(private http: HttpClient, private router: Router) { }
    public addClassifier (c:Classifier): Observable<any> {
        return this.http.post(this.url, c)

        
    }
}