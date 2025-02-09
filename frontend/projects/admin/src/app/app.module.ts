import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReceivedComponent } from './received/received.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

import { CardService } from './modal.service';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
     AppComponent,
     HomeComponent,
     SidebarComponent,
     AboutComponent,
     ServiceComponent,
     ReceivedComponent,
     UserProfileComponent,
     UsersComponent,
     DashboardComponent,
     ModalComponent,
     NotificationsComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    MdbModalModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
