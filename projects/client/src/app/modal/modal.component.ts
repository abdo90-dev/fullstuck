import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServiceForm } from 'projects/client/serviceForm';
import { ServicesService } from 'projects/client/services.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
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
  file: File| null= null
  constructor(public modalRef: MdbModalRef<ModalComponent>, private http: HttpClient,private service: ServicesService) {
    this.getUSer()
  }

  fileName = '';
  title:string='';
  serviceForm:ServiceForm={
    id:0,
    fileName:'',
    name: '',
    phoneNumber:'',
    email: '',
    serviceName: '',
    requirement:'',
    files :null,
    fileContent: '',
    date:new Date(),
    status:'',
    emailAdmin:'',
    notification:'',
    rejection:''
  }
  getUSer(){
    this.service.getUser("USER").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }
  onFileSelected(event: any) {
  this.file = event.target.files[0];


    if (this.file) {
      this.fileName = this.file.name;
      console.log("file");
    }
  }

  saveChanges() {
 


      const formData = new FormData();
      if(this.file){


        
      formData.append('name', this.userInfo.first);
      formData.append('email', this.userInfo.email);
      formData.append('phone_number', this.userInfo.phone_number);
      formData.append('serviceName', this.title);
      formData.append('requirement', this.serviceForm.requirement);
      formData.append('file', this.file);
      formData.append('action', "sent");
      formData.append('role', "USER");
      formData.append('status', "request");
      formData.append('notification', this.userInfo.first+" has sent you a srvice request");
      }
      this.http.post('http://localhost:8080/service/serviceRequest/', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully.');
          this.modalRef.close();
        },
        (error) => {
          console.error('File upload failed.');

        }
      );
    
  }}
