import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
    id: number
    username: string
    email: string
    password: string
    exp: number
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayload {
    id: number
    username: string
    email: string
    password: string

}

@Injectable()
export class AuthenticationService {
    private token: string
    private url="http://localhost:5000/users/register"
    private urllog="http://localhost:5000/users/login"
    constructor(private http: HttpClient, private router: Router) { }

    private saveToken (token: string): void {
        localStorage.setItem('usertoken', token)
        this.token = token
    }

    private getToken (): string {
        if (!this.token) {
            this.token = localStorage.getItem('usertoken')
        }
        return this.token
    }

    public getUserDetails (): UserDetails {
        const token = this.getToken()
        let payload
        if (token) {
            payload = token.split('.')[1]
            payload = window.atob(payload)
            return JSON.parse(payload)
        } else {
            return null
        }
    }

    public isLoggedIn (): boolean {
        const user = this.getUserDetails()
        if (user) {
            return user.exp > Date.now() / 1000
        } else {
            return false
        }
    }

    public register (user: TokenPayload): Observable<any> {
        return this.http.post(this.url, user)

        
    }

    public Login (user: TokenPayload): Observable<any> {
        const base = this.http.post(this.urllog, user)

        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token)
                }
                return data
            })
        )

        return request
    }
    public logout (): void {
        this.token = ''
        window.localStorage.removeItem('usertoken')
        this.router.navigateByUrl('/login')
    }
}