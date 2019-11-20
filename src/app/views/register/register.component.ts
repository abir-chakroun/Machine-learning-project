import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    id: 0,
    username: '',
    email: '',
    password: '',

}

constructor(private auth: AuthenticationService, private router: Router) { }

register () {
    this.auth.register(this.credentials).subscribe(
        () => {
            this.router.navigateByUrl('/dashboard')
        },
        err => {
            console.error(err)
        }
    )
}
}
