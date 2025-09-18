import { Component, OnInit } from '@angular/core';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: LoginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  
  showPassword = false;
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.isLoading) return;
    
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login data:', this.loginData);
      this.isLoading = false;
      // Handle login logic here
    }, 2000);
  }
}
