import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ServicesService } from 'projects/client/services.service';
import { ModalComponent } from '../modal/modal.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  card:{ title: string; text:string;section:string; imageUrl:any;} ={
    text :'',
    title:'',
    section:'',
    imageUrl:null
  }
  isUpdatePopupOpen = false;
  isDeleteConfirmationOpen = false;
  selectedFile!: File;
  modalRef: MdbModalRef<ModalComponent> | null = null;
  cardTitle:string = ''
  cardToUpdate:{ id:number,title: string; text: string; section: string; }={    
  title: '',
  text: '',
  section: '',
  id:0
  }
  imageUrl!: any[]; 
  cards:{id:number; title: string; text:string;section:string; imageUrl:any;}[] | null = null
  achievments:{id:number; title: string; text:string;section:string; imageUrl:any}[] | null = null
  image:any
  base64Data:any
  constructor(private modalService: MdbModalService,private cardService: ServicesService,private cardsServices: UserService) {
  console.log('constractor');

  }



  ngOnInit(){
    this.getNews();
    this.getachievements();
    console.log('ngOnInit');
    this.cardService.sharedData$.subscribe((newData) => {
      this.card = newData;
      if(this.card.section==='news')
      this.cards?.push(newData)
      else if(this.card.section==='achievement')
      this.achievments?.push(newData)
      console.log('Received new data:', newData);
  });
  }
  openUpdatePopup(card: any) {
    this.cardToUpdate = card ;
    
    
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
      this.getNews();
      this.getachievements();
    },(error: any )=>{console.log('Error')})
    this.isDeleteConfirmationOpen = false;
  }

  getNews() {
    this.cardService.getNews().subscribe(
      (res: any) => {
        this.cards = res
      },
      (error: any) => {
        console.error('Error fetching news:', error);
        
      }
    );
  }
  getachievements() {
    this.cardService.getAchievements().subscribe(
      (res: any) => {
        this.achievments = res
      },
      (error: any) => {
        console.error('Error fetching news:', error);
        
      }
    );
  }

  openModal(text: string) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { section: text, operation:"Add " + text  }
    })}
    getImageUrl(imageData: string): string {
      return `data:image/jpeg;base64,${imageData}`;
    }
  

  
    saveUpdatedCard() {
      
      this.cardsServices.updateCard(this.cardToUpdate,this.selectedFile,this.cardToUpdate.section).subscribe((res:any)=>{
        if(res.section==='news'){
        let index = this.cards?.findIndex(card=> card.id === this.cardToUpdate.id)

        if(index!==undefined&&this.cards){
        this.cards[index].imageUrl = res.imageUrl
        }
      }else if(res.section==='achievement'){
        let index = this.achievments?.findIndex(card=> card.id === this.cardToUpdate.id)

        if(index!==undefined&&this.achievments){
        this.achievments[index].imageUrl = res.imageUrl
        }
      }
      },(error=>{

      }))
      this.isUpdatePopupOpen = false;
    }
}
