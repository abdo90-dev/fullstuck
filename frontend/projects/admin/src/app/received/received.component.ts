import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServiceForm } from 'projects/client/serviceForm';
import { ServicesService } from 'projects/client/services.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent  implements OnInit{
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
constructor(private serviceRequestService: ServicesService,private modalService: MdbModalService,private service: ServicesService) { 
  this.getReceivedServices();
  setTimeout(()=>{
    console.log(this.serviceForm);
  },1000)
  
  this.getUSer()
}
  ngOnInit(){
    this.service.getNotification()
  }
getUSer(){
  this.service.getUser("ADMIN").subscribe((res:SignUpForm)=>{
    this.userInfo = res;
  })
}
changeStatus(id:number,status:string,servicename?:string,email?:string){
  if(servicename && email)
  this.openModal(servicename,id,email)
  else
this.serviceRequestService.changeStatus(id,status,this.userInfo.email).subscribe(()=>{

  
},(error)=>{
  console.log(error);
  
})
}
downloadFile(base64Content:any, fileName:string) {
  const byteCharacters = atob(base64Content);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
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
      statusElement.style.backgroundColor = 'rgb(79, 117, 243)'; // Set background color for 'in progress'
      break;
    case 'finished':
      statusElement.style.backgroundColor = 'rgb(104, 240, 110)'; // Set background color for 'finished'
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
modalRef: MdbModalRef<ModalComponent> | null = null;
services:{ id:number, title: string; text:string;section:string; imageUrl:any;}[] | null = null
title:string=''



openModal(text: string,id:number,email:string) {
  this.modalRef = this.modalService.open(ModalComponent, {
    data: { title: text , id: id, email:email}
  })
  
  
}
getReceivedServices(){
this.serviceRequestService.getServiceReceived("USER").subscribe((res:any)=>{
  this.serviceForm = res;
},(eror:any)=>{
  console.log(eror);
  
})
}
}
