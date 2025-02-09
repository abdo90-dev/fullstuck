import { Component } from '@angular/core';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { SessionStorageService } from 'ngx-webstorage';

declare global {
  interface Window {
    kommunicate: any;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string ="";
  public password: string="";
  user: SignUpForm = {
    first: '',
    last: '',
    email: '',
    password: '',
    phone_number: '',
    country: '',
    role: '',
    profile_image:"",
    description:""
  };

 
  constructor(private sessionStorages: SessionStorageService,private authService: LoginService) {
    
  }



  handleLogin() {

    this.authService.login(this.username, this.password).subscribe((result) => {
    this.user = result
    console.log(this.user);
    
    if(this.user.role == "USER"){
    this.sessionStorages.store('user',result)
    window.location.href = 'http://localhost:4202/home/';
    }else
    window.location.href = 'http://localhost:4201/home/';
    console.log(localStorage.getItem('userData'));
    this.sessionStorages.store('user',result)
    }, () => {
     console.log("invalid login");
    });   
  }
}
