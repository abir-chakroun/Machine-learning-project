import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'


export interface Article{
    url:string;
    xpath:string;
}
//export class Classifier {
  //  i1: number;
  //  i2:number;
   // i3:number;

//}

@Injectable()
export class ArticleService {
    private url="http://localhost:5000/users/article"
    constructor(private http: HttpClient, private router: Router) { }
    public article (a:Article): Observable<any> {
        return this.http.post(this.url, a)

        
    }
}