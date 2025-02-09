import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServiceForm } from 'projects/client/serviceForm';
import { ServicesService } from '../../../services.service'

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})
export class SentComponent{
  
  serviceForm:ServiceForm[]=[{
    id:0,
    fileName:'',
    name: '',
    phoneNumber:'',
    email: '',
    serviceName: '',
    requirement:'',
    files :null,
    fileContent:'',
    date: new Date(),
    status:'',
    emailAdmin:'',
    notification:'',
    rejection:''
  }]
  public userInfo: {
    first: string;
    last: string;
    email: string;
    password: string;
    phone_number: string;
    country: string;
    role: string;
  } = {
    first: '',
    last: '',
    email: '',
    password: '',
    phone_number: '',
    country: '',
    role: ''
  };
  fileContent: string='';


  getUSer(){
    this.service.getUser("USER").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }



  constructor(private serviceRequestService: ServicesService, private user: LoginService, private http: HttpClient,private service: ServicesService) { 
    this.getUSer();
    setTimeout(() => {

      this.getServiceRequestByEmail();
      setTimeout(()=>{
        
      },1000)
    
    }, 1000); 


  }
  getStatus(status: string) {
    const statusElement: HTMLDivElement | null = document.getElementById('status') as HTMLDivElement;
  
    if (!statusElement) {
      return; // Element not found, do nothing
    }
  
    switch (status) {
      case 'request':
        statusElement.style.backgroundColor = 'rgb(228, 220, 110)'
        break;
      case 'in progress':
        statusElement.style.backgroundColor = 'rgb(228, 220, 110)';
        break;
      case 'finished':
        statusElement.style.backgroundColor = 'rgb(104, 240, 110)'; 
        break;
        case 'refused':
          statusElement.style.backgroundColor = 'rgb(243, 112, 79)'; // Set background color for 'finished'
          break;
      default:
        // Set a default background color or leave it as is
        statusElement.style.backgroundColor = 'rgb(228, 220, 110)';
        break;
    }
  }


 

  getServiceRequestByEmail() {


    this.serviceRequestService.getServiceReceived('USER', this.userInfo.email)
      .subscribe(
        (data: ServiceForm[]) => {
          this.serviceForm = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  
}
