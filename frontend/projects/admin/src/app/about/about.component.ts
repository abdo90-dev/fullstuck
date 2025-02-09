import { Component, OnInit } from '@angular/core';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SignUpForm } from 'projects/authentication/signUpForm';
import { ServicesService } from 'projects/client/services.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  members: SignUpForm[]=[]
  card: {
    id: number; 
    title: string;
    text: string;
    section: string;
    imageUrl: any;
  } = {
    id: 0,
    title: '',
    text: '',
    section: '',
    imageUrl: null
  };
  isUpdatePopupOpen = false;
  selectedFile!: File;

  constructor(
    private cardService: ServicesService,
    private cardsServices: UserService
  ) {
    this.getDefinition();

  }
ngOnInit(){
  this.cardService.getMembers('USER').subscribe((data:SignUpForm[])=>{
    this.members = data;
  });
}
upgrade(email:string){
  this.cardService.upgrade(email).subscribe((data:SignUpForm[])=>{
  this.members = data
  })
}
deleteUser(email:string){
  this.cardService.deleteUser(email).subscribe();
}
  openUpdatePopup(card: any) {
    this.card = card;

    this.isUpdatePopupOpen = true;
  }

  getImageUrl(imageData: string): string {
    
    
    return `data:image/jpeg;base64,${imageData}`;
  }

  getDefinition() {
    this.cardService.getDiscreption().subscribe(
      (res: any) => {
        this.card = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveUpdatedCard() {
    this.cardsServices
      .updateCard(this.card, this.selectedFile, this.card.section)
      .subscribe(
        (res:any) => {
          this.card = res
        },
        (error) => {
          // Handle error if needed
        }
      );
    this.isUpdatePopupOpen = false;
  }

  cancelUpdate() {
    this.isUpdatePopupOpen = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
