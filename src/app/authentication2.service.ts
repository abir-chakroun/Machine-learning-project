import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails2 {
    id: number
    username: string
    email: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse2 {
    token: string
}

export interface TokenPayload2 {
    id: number
    username: string
    email: string
    password: string

}

@Injectable()
export class AuthenticationService2 {
    private token2: string
    //private url="http://localhost:5000/users/register"
    private urllog="http://localhost:5000/users/loginAdmin"
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken2 (token2: string): void {
        localStorage.setItem('usertoken2', token2)
        this.token2 = token2
    }

    private getToken2 (): string {
        if (!this.token2) {
            this.token2 = localStorage.getItem('usertoken2')
        }
        return this.token2
    }

    public getUserDetails2 (): UserDetails2 {
        const token2 = this.getToken2()
        let payload2
        if (token2) {
            payload2 = token2.split('.')[1]
            payload2 = window.atob(payload2)
            return JSON.parse(payload2)
        } else {
            return null
        }
    }

    public isLoggedIn2 (): boolean {
        const user = this.getUserDetails2()
        if (user) {
            return user.exp > Date.now() / 1000
        } else {
            return false
        }
    }

   // public register (user: TokenPayload): Observable<any> {
     //   return this.http.post(this.url, user)

        
    //}

    public LoginAdmin (user: TokenPayload2): Observable<any> {
        const base = this.http.post(this.urllog, user)

        const request = base.pipe(
            map((data: TokenResponse2) => {
                if (data.token) {
                    this.saveToken2(data.token)
                }
                return data
            })
        )

        return request
    }
    public logout2 (): void {
        this.token2 = ''
        window.localStorage.removeItem('usertoken2')
        this.router.navigateByUrl('/loginAdmin')
    }
}