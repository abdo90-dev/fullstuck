import { Component, Renderer2 } from '@angular/core';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServiceForm } from 'projects/client/serviceForm';
import { ServicesService } from 'projects/client/services.service';

@Component({
  selector: 'app-mynotifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  isDropdownVisible = false;
  public userInfo: SignUpForm={
    first: "",
    last: "",
    email: "",
    password: "",
    phone_number:"",
    country: "",
    role: "",
    profile_image:"",
    description:""
  }
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
  constructor(private renderer: Renderer2,private services:ServicesService,private service: ServicesService) { }
  ngOnInit() {
    this.notificationAmount();
    this.getNotifications();
  }
  getUSer(){
    this.service.getUser("ADMIN").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }
  getNotifications(){
return this.services.getAdminNotification().subscribe((res:ServiceForm[])=>{
  this.serviceForm = res
  console.log(this.serviceForm);
  
})
  }
  removeNotification(notification: ServiceForm) {
    const index = this.serviceForm.indexOf(notification);
    if (index !== -1) {
       this.serviceForm.splice(index, 1); // Remove the notification from the array
    }
  }
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }
  notificationAmount() {
    if (this.serviceForm.length != 0) {
      const statusElement: HTMLDivElement | null = document.querySelector(".notification-amount");
  
      if (statusElement) {
        this.renderer.setStyle(statusElement, 'opacity', '1');
        this.renderer.setStyle(statusElement, 'visibility', 'visible');
  
        const beforeElement = this.renderer.createElement('div');
        this.renderer.addClass(beforeElement, 'before-element');
        this.renderer.setStyle(beforeElement, 'animation-name', 'bounce');
        this.renderer.setStyle(beforeElement, 'animation-delay', '450ms');
        this.renderer.appendChild(statusElement, beforeElement);
      }
    }
  }
  
}
