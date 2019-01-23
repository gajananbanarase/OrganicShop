import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
  constructor(private authService: AuthService, private router: Router) { }

  canActivete(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } 
        else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
    )
  }
}
