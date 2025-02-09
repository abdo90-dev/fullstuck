import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SignUpForm } from './signUpForm';
import { Observable } from 'rxjs/internal/Observable';
import { SharedData2Service } from 'shared-data2';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
public username=""
public password=""


constructor(private http: HttpClient) {

}



login(email: string, password: string): Observable<SignUpForm> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.createBasicAuthToken(email, password)
  });
  this.username = email
  this.password = password
  const params = new HttpParams().set('email', email);
  return this.http.get<SignUpForm>('http://localhost:8080/home/login', { headers,  params}).pipe(
    map((res: SignUpForm) => {

      return res;
    })
  );
}

createBasicAuthToken(username: string, password: string) {
  return 'Basic ' + window.btoa(username + ":" + password);
}

}

