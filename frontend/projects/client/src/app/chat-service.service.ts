import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage } from 'projects/admin/src/app/models/message';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'
import { ChatComponent } from './chat/chat.component';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private stompClient: any;
  public messageSubject: BehaviorSubject<ChatMessage> = new BehaviorSubject(new ChatMessage());
  constructor(private http:HttpClient) { }
  initializeWebSocketConnection(senderEmail:string) {
    const serverUrl = 'http://localhost:8080/websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${senderEmail}/queue/messages`, (message: any) => {
        console.log(message);
        if (message.body) {
          console.log(message.body);
          const chatMessage: ChatMessage = JSON.parse(message.body);
            this.messageSubject.next(chatMessage);
        }
      });
    });
  }

  getMessages(senderEmail:string, receiverEmail:string):Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(`http://localhost:8080/reds/chatMessages/${senderEmail}/${receiverEmail}`);
  }
  sendTranslation(text:any){
    return this.http.post(`http://localhost:8080/translator/translate`,text);
  }
  sendMessage(message:string) {
   const veriabl= this.stompClient.send(`/app/chat`, {}, message);
   console.log(veriabl);
   
  }
}