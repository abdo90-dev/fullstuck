import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegitrationComponent } from './regitration/regitration.component';
// import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { LoginService } from 'projects/authentication/login.service';

const approutes: Routes = [
  {
    path: '', component: LoginComponent    
  },
  {
    path: 'Registration', component: RegitrationComponent    
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegitrationComponent,
    // ChatbotComponent,
    ChatDialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(approutes),
    NgxWebstorageModule.forRoot(),
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
