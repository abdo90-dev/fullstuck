import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SignUpForm } from 'projects/authentication/signUpForm';

@Component({
  selector: 'app-user-update-modal',
  templateUrl: './user-update-modal.component.html',
  styleUrls: ['./user-update-modal.component.scss']
})
export class UserUpdateModalComponent {
  client: SignUpForm = {
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
  saveUpdatedClient() {
    const formData = new FormData();
    formData.append("firstname",this.client.first)
    formData.append("lastname",this.client.last)
    formData.append("email",this.client.email)
    formData.append("password",this.client.password)
    formData.append("phonenumber",this.client.phone_number)
    formData.append("country",this.client.country)
    formData.append("role",this.client.role)
    formData.append("profileimage",this.client.profile_image)
   
    
    formData.append("op","update")

    this.http.post("http://localhost:8080/signup/register/", formData).subscribe(
      (res:any) => {
        this.client = res
        this.modalRef.close(this.client);
        // location.reload();
      }
    );
  }

  constructor(public modalRef: MdbModalRef<UserUpdateModalComponent>, private http: HttpClient) {
    this.client.password = ''
  }
}
