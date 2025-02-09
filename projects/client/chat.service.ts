import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private isChatVisible = new BehaviorSubject<boolean>(false);
  public isChatVisible$ = this.isChatVisible.asObservable();
  constructor() { }
  public toggleChat(): void {
    this.isChatVisible.next(!this.isChatVisible.value);
  }
}
