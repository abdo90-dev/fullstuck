import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ReceivedComponent } from './received/received.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes =[
{
  path:"home", component: HomeComponent
  
},{
  path:"about", component: AboutComponent
},{
  path:"service", component: ServiceComponent
},{
  path:"received", component: ReceivedComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
