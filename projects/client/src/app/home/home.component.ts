import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'projects/client/services.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
constructor(private service:ServicesService){
  this.getNews();
  this.getAchievements()
}
numberOfImages:number=0
  rotationAngle: number=0;
  translateZ: number=0;
  cards: any[] = [];
  achievements:any[]=[]
ngOnInit() {
console.log(this.numberOfImages);
    this.rotationAngle = 360 / this.numberOfImages;
    this.translateZ = this.calculateTranslateZ(); 
}
getImageUrl(imageData: string): string {
  return `data:image/jpeg;base64,${imageData}`;
}
  randomRotate(): string {
    const deg = Math.random() * (5 - -5) + -5;
    return `rotate(${deg}deg)`;
  }
  
  makeText(): string {
    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veritatis eaque necessitatibus, explicabo vero hic, perspiciatis unde minus error consectetur, quos sunt officiis ad repellendus pariatur eligendi tempora praesentium tenetur';
    const loremArray = lorem.split(' ');
    const amountOfText = Math.floor(Math.random() * (30 - 10) + 10);
    const text = loremArray.slice(0, amountOfText);
    return text.join(' ') + '.';
  }
  calculateTranslateZ(): number {
    const containerWidth = 320;
    const radius = containerWidth / 2;
    const numberOfImages = this.cards.length;
    const anglePerImage = 360 / numberOfImages;
    const translateZ = radius / Math.tan((anglePerImage / 2) * (Math.PI / 180));
    return translateZ;
  }
getNews(){
  this.service.getNews().subscribe((res:any)=> 
  {this.cards = res
    this.numberOfImages = this.cards.length;
  console.log(this.numberOfImages);}
  
  )
  }
  getAchievements(){
    this.service.getAchievements().subscribe(res=>
     this.achievements = res 
      )
  }
}
