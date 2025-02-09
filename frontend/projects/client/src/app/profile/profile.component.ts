import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServicesService } from 'projects/client/services.service';
import { BehaviorSubject } from 'rxjs';
import { UserUpdateModalComponent } from '../user-update-modal/user-update-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  modalRef: MdbModalRef<UserUpdateModalComponent> | null = null;
  client:SignUpForm={
    first: '',
    last: '',
    email: '',
    password: '',
    phone_number: '',
    country: '',
    role: '',
    profile_image: '',
    description: ''
  };
  clientValue = new BehaviorSubject<SignUpForm>(this.client); 
  selectedFile!:File;
  constructor(private modalService: MdbModalService,private service: ServicesService,private http: HttpClient) {
    this.getUSer()  
   
      
  }
  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const pictureDiv = document.getElementById('pictureDiv');
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if(pictureDiv)
        pictureDiv.style.backgroundImage = `url(${e.target.result})`;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
ngOnInit(){
this.getUSer()
console.log(this.client);

}
getUSer(){
  this.service.getUser("USER").subscribe((res:SignUpForm)=>{
    
    this.client=res;
    this.clientValue.next(res);
  })
}
getImageUrl(imageData: string): string {
  return `data:image/jpeg;base64,${imageData}`;
}
openModal() {
  this.client.password = "";
  this.modalRef = this.modalService.open(UserUpdateModalComponent, {
    data: { client: this.client }
  });

  this.modalRef.onClose.subscribe((updatedClient: SignUpForm) => {
    if (updatedClient) {
      this.client=updatedClient;
      // console.log(this.client.getValue());
      
    }
  });
}
  }
