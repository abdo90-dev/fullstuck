import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ServicesService } from 'projects/client/services.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit{
  modalRef: MdbModalRef<ModalComponent> | null = null;
  services:{ id:number, title: string; text:string;section:string; imageUrl:any;}[] | null = null
 title:string=''
  constructor(private modalService: MdbModalService,private service:ServicesService) {}
  ngOnInit(): void {
    this.service.getServices().subscribe((data:any)=>{
      this.services = data;
     
    });
  }

  openModal(text: string) {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: { title: text }
    })
    
    
  }
  getImageUrl(imageData: string): string {
    return `data:image/jpeg;base64,${imageData}`;
  }
  randomRotate(): string {
    const deg = Math.random() * (5 - -5) + -5;
    return `rotate(${deg}deg)`;
  }

}
