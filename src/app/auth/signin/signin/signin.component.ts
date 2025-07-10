import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes';
import {AuthService} from "../../service/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Validators} from "ngx-editor";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  public routes = routes;

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  constructor(private router: Router,private fb: FormBuilder,
              private authService: AuthService,) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  navigation() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;
      console.log(this.loginForm.value);

      this.authService.login(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate([routes.adminDashboard])
        },
        error: (error) => {
          console.error('Login error:', error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
  public password : boolean[] = [false];

  public togglePassword(index: number){
    this.password[index] = !this.password[index]
  }
  get f() {
    return this.loginForm.controls;
  }
}
