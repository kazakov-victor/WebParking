import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/user';

import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private tokenStorage: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group ({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
    username: this.form.value.username,
    password: this.form.value.password
    };

    this.authService.attemptAuth(user).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/main']);
        this.reloadPage();
      },
      error => {
        console.log('Это статус ошибки - ', error.error.status);
        console.log('Это имя ошибки - ', error.error.error);
        console.log('Это ошибка - ', error.error);
        this.errorMessage = error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
