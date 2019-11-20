


import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService2} from "./authentication2.service";

@Injectable()
export class CanActivateAuthGuard2 implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthenticationService2
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn2()) {

      return true;
    }

    
    this.router.navigate(['/loginAdmin']);
    return false;
  }
}
