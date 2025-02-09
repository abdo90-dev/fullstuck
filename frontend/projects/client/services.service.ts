import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ServiceForm } from './serviceForm';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = "http://localhost:8080/service/getServicesRequist";
  user: SignUpForm = {
    first: '',
    last: '',
    email: '',
    password: '',
    phone_number: '',
    country: '',
    role: '',
    profile_image:'',
    description:''
  };
  card:{ title: string; text:string;section:string; imageUrl:any;} ={
    text :'',
    title:'',
    section:'',
    imageUrl:null
  }
  private dataSubject = new BehaviorSubject<any>(this.card);
  sharedData$ = this.dataSubject.asObservable();

  updateData(card:{ title: string; text:string;section:string; imageUrl:any;}) {
      this.dataSubject.next(card);
  }
  constructor(private http:HttpClient) { }
  getServices(): Observable<object>{
    return this.http.get("http://localhost:8080/service/services/")
  }
  getServicesResponse(email_client:string,role:string){
     return this.http.get<ServiceForm[]>(`http://localhost:8080/service/servicesResponse?email_client=${email_client}&role=${role}`)
  }
   getNews(): Observable<object>{
    return this.http.get("http://localhost:8080/home/news/")
  }

  getMembers(role:string){
    return this.http.get<SignUpForm[]>(`http://localhost:8080/aboutUs/members?role=${role}`);

  }
  upgrade(email:string):Observable<SignUpForm[]>{
    let data = new FormData()
    data.append("email",email)    
    return this.http.put<SignUpForm[]>(`http://localhost:8080/aboutUs/upgrade`,data)
  }
  deleteUser(email:string){
    return this.http.delete(`http://localhost:8080/aboutUs/delete?email=${email}`)
  }
changeStatus(id: number,status:string,email?:string) {
    let data = new FormData()
data.append("id",id.toString())
data.append("status",status)
if(email)
data.append("email",email)
    return this.http.put(`http://localhost:8080/service/update`, data);
  }
  getServiceReceived(user: string, email?: string) {
  
  let url = `${this.apiUrl}?role=${user}`;

  if (email) {
    url += `&email=${email}`;
  }

  return this.http.get<ServiceForm[]>(url);
}
  getUser(role:string, email?:string): Observable<SignUpForm> {
    let url = `http://localhost:8080/home/user?role=${role}`;

    if (email) {
      url += `&email=${email}`;
      
    }
    return this.http.get<SignUpForm>(url)
   
  }
  getNotification(){
   return this.http.get<ServiceForm[]>(`http://localhost:8080/service/notations`)
  }
  getAdminNotification(){
    return this.http.get<ServiceForm[]>(`http://localhost:8080/service/AdminNotifications`)
   }
  removeNotification(notification:ServiceForm){
    console.log(notification);
    
    return this.http.delete(`http://localhost:8080/service/removeNotification?notification=${notification.id}`)
  }
  getAchievements(): Observable<any>{
    return this.http.get<any[]>("http://localhost:8080/home/achievement/")
   }
   getDiscreption():Observable<any>{
    return this.http.get<any>("http://localhost:8080/aboutUs/definition/")
   }
}
