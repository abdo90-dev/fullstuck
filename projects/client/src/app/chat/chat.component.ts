import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChatMessage } from 'projects/admin/src/app/models/message';
import { UserService } from 'projects/admin/src/app/user.service';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ChatService } from 'projects/client/chat.service';
import { ServicesService } from 'projects/client/services.service';
import { from, Subscription } from 'rxjs';
import { ChatServiceService } from '../chat-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  @Input() messages: ChatMessage[]=[];
  private subscriptions = new Subscription();
  @Input()   selectedContact: SignUpForm={
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
  chatForm: FormGroup;
  chatId: any = 0;
  message:string=''
  userexist=false
 
  public messageSender: SignUpForm={
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
  public userInfo: SignUpForm={
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
  check = sessionStorage.getItem('username');
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  users:SignUpForm[]=[]
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  constructor(private chatServices: ChatService,private userservice: UserService, private chatService: ChatServiceService,private formBuilder: FormBuilder,private service: ServicesService){
    this.chatForm = this.formBuilder.group({
      message: [''], 
    });
    this.getUSer();
    this.getUsers('ADMIN');

  }
  formatMessageTime(timestamp: string): string {
         const dates = new Date(Date.parse(timestamp))
    return `${dates.getHours()}:${dates.getMinutes()}`;

  }
  getUSer(){
    this.service.getUser("USER").subscribe((res:SignUpForm)=>{
      this.userInfo = res;
    })
  }
  getMessages(){
    this.chatService.getMessages(this.userInfo.email,this.selectedContact.email).subscribe((res)=>{
      this.messages = res;
      console.log(res);
      
    },error => console.log(error)
     )
  }
  selectContact(user: SignUpForm) {
    this.selectedContact = user;
    this.getMessages()
  }
  getMessageClasses(sender: string): string {
    if (sender === this.userInfo.email) {
      return 'chat-img1 pull-right';
    } else {
      return 'chat-img1 pull-left';
       }
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
  getUsers(role:string){
    return from(this.userservice.getAllUsers(role))
  }
  findUserByEmail(email: string): SignUpForm  {
    const userdata = this.users.find(user => user.email === email);
    if(userdata)
    return userdata;
    else{
     const useNotFound: SignUpForm={
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
      return useNotFound
    }
   
  }
  sendMessage(receiver:SignUpForm ): void {
    const message = this.chatForm.value.message;
    const newMessage: ChatMessage = {
      sender: this.userInfo.email,
      content: message,
      receiver: receiver.email,
      timestamp:new Date().toISOString()

    };
   
    const messageJSON = JSON.stringify(newMessage);
    this.chatService.sendMessage(messageJSON);
    this.chatForm.patchValue({ message: '' });
    this.messages.push(newMessage);
   
  }

  getImageUrl(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }
  getLastMessage(user: SignUpForm): string {
    const lastMessage = this.messages
      .filter(message => message.sender === user.email || message.receiver === user.email)
      .pop();
  
    if (lastMessage) {
      return lastMessage.content;
    }
    return '';
  }


  ngOnInit(): void {
    this.getUsers("ADMIN").subscribe(
      (data: SignUpForm[]) => {
        this.users = data;
        this.chatService.initializeWebSocketConnection(this.userInfo.email)
        this.chatService.messageSubject.subscribe((message) => {
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
    this.subscriptions.add(
      this.chatServices.isChatVisible$.subscribe(visible => {
        this.isVisible = visible;
      })
    );
  }

}
