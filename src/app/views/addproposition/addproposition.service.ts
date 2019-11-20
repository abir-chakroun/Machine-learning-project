import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'



export interface Pro {
    id: number
    titre: string
    Contenu: string
    label: string

}

@Injectable()
export class AddpropositionService {
    private url="http://localhost:5000/users/Addproposition"
    constructor(private http: HttpClient, private router: Router) { }
    public addproposition (proposition:Pro): Observable<any> {
        return this.http.post(this.url, proposition)

        
    }
}