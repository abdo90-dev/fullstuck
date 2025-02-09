import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReceivedComponent } from './received/received.component';
import { SentComponent } from './sent/sent.component';
import { ServicesComponent } from './services/services.component';

const approutes: Routes = [
  {
    path: 'services', component: ServicesComponent

  },
  {
    path: 'sent', component: SentComponent

  },
  {
    path: 'aboutus', component: AboutusComponent

  },
  {
    path: 'profile', component: ProfileComponent

  },
   {
    path: 'home', component: HomeComponent

  },
  {
   path: 'received', component: ReceivedComponent

 }

]

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
