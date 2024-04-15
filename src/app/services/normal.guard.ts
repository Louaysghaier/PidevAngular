import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  
  constructor(private login:AccountService,private router:Router){}
  
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean |
     UrlTree {

      if(this.login.getIsConnected() && this.login.getUserRole() == 'NORMAL'){
        return true;
      }

      this.router.navigate(['login']);
    return false;
  }
  
}
