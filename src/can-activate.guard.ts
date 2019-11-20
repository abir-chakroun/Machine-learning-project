


import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {

      return true;
    }

    
    this.router.navigate(['/login']);
    return false;
  }
}
