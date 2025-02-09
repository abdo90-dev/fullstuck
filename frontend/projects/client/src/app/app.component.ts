import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

import { SharedData2Service } from 'shared-data2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) {
 

  }

}