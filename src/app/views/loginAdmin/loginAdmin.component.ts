import { Component,OnInit } from '@angular/core';
import { AuthenticationService2, TokenPayload2 } from '../../authentication2.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  templateUrl: 'LoginAdmin.component.html',
  styleUrls: ['LoginAdmin.component.css']
})
export class LoginAdminComponent implements OnInit { 
  credentials2: TokenPayload2 = {
    id: 0,
    username: '',
    email: '',
    password: '',
}

constructor(private auth: AuthenticationService2, private router: Router) { }
ngOnInit() {
    this.auth.logout2;
}

loginAdmin () {
    this.auth.LoginAdmin(this.credentials2).subscribe(
        () => {
            this.router.navigateByUrl('/Admin')
        },
        err => {
            console.error(err)
        }
    )
}

}
