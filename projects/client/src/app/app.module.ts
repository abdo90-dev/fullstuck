import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { NavbarComponent } from './navbar/navbar.component';
import { ServicesComponent } from './services/services.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentComponent } from './sent/sent.component';
import { ReceivedComponent } from './received/received.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UserUpdateModalComponent } from './user-update-modal/user-update-modal.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ToastrModule } from 'ngx-toastr';
import { ChatComponent } from './chat/chat.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MatDialog } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    NavbarComponent,
    ServicesComponent,
    SentComponent,
    ReceivedComponent,
    AboutusComponent,
    ProfileComponent,
    HomeComponent,
    UserUpdateModalComponent,
    NotificationsComponent,
    ChatComponent,
    ChatbotComponent
  ],
  imports: [
 
    BrowserAnimationsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    MdbModalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
