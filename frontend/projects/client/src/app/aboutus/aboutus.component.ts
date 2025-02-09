import { Component, ComponentFactoryResolver, ComponentRef, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { MdbModalRef} from 'mdb-angular-ui-kit/modal';
import { ChatMessage } from 'projects/admin/src/app/models/message';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ChatService } from 'projects/client/chat.service';
import { ServicesService } from 'projects/client/services.service';
import { ChatServiceService } from '../chat-service.service';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  @ViewChild('mainSection', { read: ViewContainerRef }) 
  chatContainerRef!: ViewContainerRef;
  chatComponentRef!: ComponentRef<ChatComponent>;
  members: SignUpForm[]=[]
  isChatOpen: boolean=false
  data : Date = new Date();
  focus:any;
  focus1:any;
  messages: ChatMessage[]=[]; 
  modalRef: MdbModalRef<ChatComponent> | null = null;
  description={
    imageUrl:'',
    title:'',
    text:''
  }
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
  constructor(private chatServices: ChatServiceService,private chatService:ChatService,private service: ServicesService) { 
this.getDescription()
this.getUSer()
  }
  selectedContact: SignUpForm={
    first: "",
    last: "",
    email: "",
    password: "",
    phone_number:"",
    country: "",
    role: "",
    profile_image:'',
    description:''
  } 
  getUSer(){
    this.service.getUser("USER").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }
openChat(user:SignUpForm){
this.selectedContact= user
this.chatService.toggleChat()
console.log(this.userInfo.email+'/'+this.selectedContact.email);

this.chatServices.getMessages(this.userInfo.email,this.selectedContact.email).subscribe((res:ChatMessage[])=>{
  this.messages = res;
})
console.log("here call of the function");
}

  ngOnInit() {
    this.service.getMembers('ADMIN').subscribe((data:SignUpForm[])=>{
      this.members = data;
    });
  }
  
  getImageUrl(image:string): string {
    return `data:image/jpeg;base64,${image}`;
  }
  ngOnDestroy(){
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }
  getDescription(){
    this.service.getDiscreption( ).subscribe((res: any)=> {
      this.description = res
    })
  }

}