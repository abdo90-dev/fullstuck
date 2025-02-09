import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ServicesService } from 'projects/client/services.service';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  isUpdatePopupOpen = false;
  isDeleteConfirmationOpen = false;
  selectedFile!: File;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  cardTitle:string = ''
  cardToUpdate:{ id:number,title: string; text: string; section: string; imageUrl:any }={    
  title: '',
  text: '',
  section: '',
  imageUrl:null,
  id:0
  }
  constructor(private modalService: MdbModalService,private cardService: ServicesService,private cardsServices: UserService) {
    this.getServices();

  }
  cards:{ id:number, title: string; text:string;section:string; imageUrl:any;}[] =[]
  image:any
  base64Data:any
  openUpdatePopup(card: any) {
    this.cardToUpdate = card ;
    console.log(card);
    
    this.isUpdatePopupOpen = true;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

  }
  cancelUpdate() {
    this.isUpdatePopupOpen = false;
  }
  cancelDelete() {
    this.isDeleteConfirmationOpen = false;
  }
  openDeleteConfirmationPopup(title:string) {
    this.isDeleteConfirmationOpen = true;
    this.cardTitle = title;
  }
  deleteCard() {
    this.cardsServices.deleteCard(this.cardTitle).subscribe((res:any)=>{

    },(error: any )=>{console.log('Error')})
    this.isDeleteConfirmationOpen = false;
  }
  getServices() {
    this.cardService.getServices().subscribe(
      (res: any) => {
        this.cards = res
      },
      (error: any) => {
        console.error('Error fetching service:', error);
        
      }
    );
  }



    getImageUrl(imageData: string): string {
      return `data:image/jpeg;base64,${imageData}`;
    }
  

  
    saveUpdatedCard() {
      
      this.cardsServices.updateCard(this.cardToUpdate,this.selectedFile,this.cardToUpdate.section).subscribe((res:any)=>{
        if(this.cards){
        const index = this.cards.findIndex((value, index, obj) => value.id === this.cardToUpdate.id);
        this.cards[index] = res
        }
      },(error=>{

      }))
      this.isUpdatePopupOpen = false;
    }

  openModal(text: string) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { section: text , operation:"Add " + text}
    })}

}

