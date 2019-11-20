import { Component,OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit { 
  credentials: TokenPayload = {
    id: 0,
    username: '',
    email: '',
    password: '',
}

constructor(private auth: AuthenticationService, private router: Router) { }
ngOnInit() {
    this.auth.logout;
}

login () {
    this.auth.Login(this.credentials).subscribe(
        () => {
            this.router.navigateByUrl('/Home')
        },
        err => {
            console.error(err)
        }
    )
}

}
