import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output} from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServicesService } from 'projects/client/services.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit{
  @Output() card:{ title: string; text:string;section:string; imageUrl:any;} ={
    text :'',
    title:'',
    section:'',
    imageUrl:null
  }
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
  ngOnInit(){
    console.log(this.operation);
    
  if(this.operation===('Add '+this.section))
      this.modalTitle = 'Add '+this.section
  }
  constructor(public modalRef: MdbModalRef<ModalComponent>, private http: HttpClient,private service: ServicesService) {
    this.getUSer()

  }
  modalTitle:String=''
  fileName = '';
  title:string='';
  operation!:string
  id:number=0;
  section!:string
  email:string=""
    description:string=''
 
  getUSer(){
    this.service.getUser("ADMIN").subscribe((res:SignUpForm)=>{
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
  if(this.operation==='Add '+this.section){
console.log(this.operation);

  formData.append('serviceName', this.title);
  formData.append('text', this.description);
  formData.append('section', this.section);
  formData.append('image_url', this.file);
  this.card.imageUrl = this.file
  this.card.section = this.section
  this.card.text = this.description
  this.card.title = this.title
  
  this.http.post('http://localhost:8080/home/save/', formData).subscribe(
    (response:any) => {
      this.modalRef.close()
      this.service.updateData(response)
    },
    (error) => {
      console.error('File upload failed.');

    }
  );
  }else{

        
      formData.append('name', this.userInfo.first);
      formData.append('email', this.userInfo.email);
      formData.append('phone_number', this.userInfo.phone_number);
      formData.append('serviceName', this.title);
      formData.append('requirement', this.description);
      formData.append('notification', "the request has been finished and sent back by "+ this.userInfo.first);
      formData.append('file', this.file);
      formData.append('action', "response");
      formData.append('role', "ADMIN");
      formData.append('status', "sent back");
      formData.append('client_mail', this.email);
      
      this.http.post('http://localhost:8080/service/serviceRequest/', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully.');

        },
        (error) => {
          console.error('File upload failed.');

        }
      );
    this.service.changeStatus(this.id,"finished",this.userInfo.email).subscribe(()=>{
      
    })
  }}
}

}


