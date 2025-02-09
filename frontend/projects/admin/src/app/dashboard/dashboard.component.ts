import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ChatServiceService } from 'projects/admin/src/app/chat-service.service'
import { ChatMessage } from '../models/message';
import { UserService } from '../user.service';
import { LoginService } from 'projects/authentication/login.service';
import { ServicesService } from 'projects/client/services.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('chatBox')  chatBox!: ElementRef;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  isChatOpen: boolean = false;
  chatForm: FormGroup;
  chatId: any = 0;
  message:string=''
  classname:string= 'clearfix'
  messages: ChatMessage[]=[]; 
  public messageSender: SignUpForm={
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
  selectedContact!: SignUpForm
  users:SignUpForm[]=[]

  getImageUrl(imageData: string): string {

    
    return `data:image/jpeg;base64,${imageData}`;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { 
      console.log(err);
    }
  }
  formatMessageTime(timestamp: string): string {
    console.log(timestamp);
        const dates = new Date(Date.parse(timestamp))
    return `${dates.getHours()}:${dates.getMinutes()}`;

  }
  constructor(private cdr: ChangeDetectorRef, private userservice: UserService, private chatService: ChatServiceService,private user:LoginService,private formBuilder: FormBuilder,private service: ServicesService){
    this.chatForm = this.formBuilder.group({
      message: [],  });
    
    this.getUSer();
    

  
  }
  getUSer(){
    this.service.getUser("ADMIN").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }
sendMessage(receiver:SignUpForm ): void {
    const message = this.chatForm.value.message;
    const newMessage: ChatMessage = {
      sender: this.userInfo.email,
      content: message,
      receiver: receiver.email,
      timestamp:new Date().toISOString()
    };
   console.log(receiver.email);
   
    const messageJSON = JSON.stringify(newMessage);
    this.chatService.sendMessage(messageJSON);
    this.chatForm.patchValue({ message: '' });
    this.messages.push(newMessage);

  }
  
  getMessages(){
    this.chatService.getMessages(this.userInfo.email,this.selectedContact.email).subscribe((res:ChatMessage[])=>{
      this.messages = res;
    })
  }
  getMessageClasses(sender: string): string {
    if (sender === this.userInfo.email) {
      return 'message-data text-right';
    } else {
      return 'message-data';
    }
  }

  getUsers(role:string){
    return from(this.userservice.getAllUsers(role))
  }

  getLastMessage(user: SignUpForm): string {
    if(this.messages){
    const lastMessage = this.messages
      .filter(message => message.sender === user.email || message.receiver === user.email)
      .pop();   
    if (lastMessage) {
      return lastMessage.content;
    }}
    return '';
  }
  findUserByEmail(email: string): SignUpForm | undefined {
    return this.users.find(user => user.email === email);
  }
  selectContact(user: SignUpForm) {
    this.selectedContact = user;
    this.getMessages()
  }

  ngOnInit(): void {
    this.getUsers("USER").subscribe(
      (data: SignUpForm[]) => {
        this.users = data;
        this.selectedContact = this.users[0];
        this.chatService.initializeWebSocketConnection(this.userInfo.email)
        this.chatService.messageSubject.subscribe((message) => {
          console.log(message);
          this.messages.push(message);                
          }
          );
      },
      (error) => {
        console.log(error);
      }    
    )
    var chat = document.getElementById('chat');
    if (chat) {
      chat.scrollTop = chat.scrollHeight - chat.clientHeight;
    }
    this.getMessages()
  }

  openChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
