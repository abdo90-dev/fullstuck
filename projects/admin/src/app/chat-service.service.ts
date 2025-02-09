import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage } from 'projects/admin/src/app/models/message';
import { BehaviorSubject, Observable } from 'rxjs';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs'

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
        if (message.body) {
          console.log(message.body);
          const chatMessage: ChatMessage = JSON.parse(message.body);
            this.messageSubject.next(chatMessage);
        }else{
          console.log("hill");
          
        }
      });
    });
  }
  getMessages(senderEmail:string, receiverEmail:string):Observable<ChatMessage[]>{
    return this.http.get<ChatMessage[]>(`http://localhost:8080/reds/chatMessages/${senderEmail}/${receiverEmail}`);
  }
  sendMessage(message:string) {
    const veriabl:any = this.stompClient.send(`/app/chat`, {}, message);
   console.log(veriabl);
  }
}
