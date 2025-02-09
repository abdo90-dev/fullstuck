import { Component, OnInit } from '@angular/core';
import { UserService } from 'projects/admin/src/app/user.service';
import { LoginService } from 'projects/authentication/login.service';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServiceForm } from 'projects/client/serviceForm';
import { ServicesService } from 'projects/client/services.service';
import { forkJoin, from, Observable, pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss']
})
export class ReceivedComponent implements OnInit {
  adminEmailMap: { [email: string]: string } = {};
  serviceForm:ServiceForm[]=[]
  fileContent: string='';

  public userInfoAdmin:SignUpForm[]=[]

  public userInfo!:SignUpForm
  getUSer(role:string):Observable<SignUpForm>{
   return this.serviceRequestService.getUser(role).pipe(tap((res:SignUpForm)=>{
      this.userInfo = res;
    }))
    
  }  
  getUsers(role: string): Observable<SignUpForm[]> {
  
    return this.userservice.getAllUsers(role).pipe(
      tap((admins: SignUpForm[]) => {
        this.userInfoAdmin = admins;
      })
    );
  }

  constructor(private userservice: UserService,private serviceRequestService: ServicesService, private user: LoginService) { 

  }
getAdminByEmail(email:string):SignUpForm|undefined{
  const admin:SignUpForm|undefined = this.userInfoAdmin.find(admin=>admin.email === email)
  console.log(this.userInfoAdmin);
  console.log(email);
  console.log(admin);
return admin;
}
getImageUrl(admin:SignUpForm|undefined): string {
  let data:string=''
  if(admin!==undefined){
   data = admin.profile_image
  }
  console.log(data);
  
  return `data:image/jpeg;base64,${data}`;
}
  changeStatus(id:number,status:string){
    this.serviceRequestService.changeStatus(id,status).subscribe(()=>{

      
    },(error)=>{

      
    })
    }
  getServicesResponse():Observable<ServiceForm[]> {
    return this.serviceRequestService.getServicesResponse(this.userInfo.email, 'ADMIN')
    .pipe(tap(
      (data: ServiceForm[]) => {
        this.serviceForm = data;
     })
    );
  }
  downloadFile(base64Content:any, fileName:string) {
    const byteCharacters = atob(base64Content);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  ngOnInit(){
    
    this.getUSer('USER').pipe(
      switchMap(() => this.getUsers('ADMIN')),
      switchMap(() => this.getServicesResponse())
    ).subscribe(() => {
      console.log(this.userInfoAdmin);
      
      this.userInfoAdmin.forEach(admin => {
        this.adminEmailMap[admin.email] = admin.first;
      });
      console.log(this.userInfoAdmin);
    });
   }
  
  
  
 
}
