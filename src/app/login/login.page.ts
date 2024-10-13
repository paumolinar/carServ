import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Iniciando sesión con', username, password);

      if (this.loginService.validateLogin(username, password)) {
        console.log('Login correcto', 'success');
        this.router.navigate(['/home']);
      } else {
        console.log('Login fallido', 'danger');
      }
    }
  }

  resetPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
