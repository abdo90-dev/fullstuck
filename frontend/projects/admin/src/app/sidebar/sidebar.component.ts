import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router) {}
  ngOnInit(): void {
  
  }
  closeSidebarAndNavigate(route: string) {
    const checkbox = document.getElementById('active') as HTMLInputElement;
    checkbox.checked = false; // Close the sidebar
    this.router.navigateByUrl(route); // Navigate to the specified route
  }
}



