import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChatServiceService } from '../chat-service.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  selectedLanguage:string=''
  displaychat:Boolean=false
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
setLanguage(arg0: string) {
  
this.selectedLanguage=arg0;
const botmessage = document.getElementById("botResponse");
if(botmessage)
botmessage.style.display = 'block'
}
 chatForm: FormGroup;
  messages: {
    sender: string;
    content: any;
  }[]=[];
  constructor(private formBuilder: FormBuilder, private service: ChatServiceService){
    this.chatForm = this.formBuilder.group({
      message: [''], 
    });
  }
  displayChatbot(){
this.displaychat = !this.displaychat;
console.log(this.displaychat);

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
sendMessage() {
  const message = this.chatForm.value.message;
  const formData = new FormData();
  if(message !==null&&message !==''){
    const msg: { sender: string; content: string; tergetLang: string} = {
      sender: 'user',
      content: message,
      tergetLang:this.selectedLanguage
    };
    formData.append('content', message);
    formData.append('tergaetLang', this.selectedLanguage);
this.service.sendTranslation(formData).subscribe((res:any)=>{
  const translatedText = res.translations[0].text;
  const msg1: { sender: string; content: any; tergaetLang:string} = {
    sender: 'translator',
    content: translatedText,
    tergaetLang:this.selectedLanguage
  };
  this.messages.push(msg1);
})
  this.messages.push(msg)
  this.chatForm.reset({ message: '' });
  console.log(msg);
  
  }
}

}
