import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {TokenStorageService} from './auth/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              private tokenStorage: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.login();
    if (this.authService.isLoggedIn) { return true; }
    else {
      this.tokenStorage.signOut();
      this.router.navigate(['/auth/signin']);
    }
  }
}


