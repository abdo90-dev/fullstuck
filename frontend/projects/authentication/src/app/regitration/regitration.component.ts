import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SignUpForm } from 'projects/authentication/signUpForm';



@Component({
  selector: 'app-register',
  templateUrl: './regitration.component.html',
  styleUrls: ['./regitration.component.scss']
})
export class RegitrationComponent {
  client: SignUpForm = {
    first: '',
    last: '',
    email: '',
    password: '',
    phone_number: '',
    country: '',
    role: 'USER',
    profile_image:"",
    description:""
  };
  selectedFile!:File

  constructor(private http: HttpClient) { }
  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  // Function to handle the selected file
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
  sendUserInfo(): void {
    const formData = new FormData();
    formData.append("firstname",this.client.first)
    formData.append("lastname",this.client.last)
    formData.append("email",this.client.email)
    formData.append("password",this.client.password)
    formData.append("phonenumber",this.client.phone_number)
    formData.append("country",this.client.country)
    formData.append("role",this.client.role)
    formData.append("profileimage",this.selectedFile)
    this.http.post("http://localhost:8080/signup/register/", formData).subscribe(
      res => {
        location.reload();
      }
    );
  }
}
