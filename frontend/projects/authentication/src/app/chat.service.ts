import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private dialogflowApiUrl = 'https://dialogflow.googleapis.com/v2/projects/scientifictranslation-4fe03/agent/sessions';

  constructor(private http: HttpClient) { }

  detectIntent(sessionId: string, message: string) {
    const sessionPath = `${this.dialogflowApiUrl}/${sessionId}:detectIntent`;

    const requestBody = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'en-US'
        }
      }
    };

    return this.http.post<any>(sessionPath, requestBody);
  
  }
}
