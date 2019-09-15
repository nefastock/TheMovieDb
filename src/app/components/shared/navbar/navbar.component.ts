import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText: string;
  msgSearchTextEmpty: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  searchMovie(searchText: string) {
    
    this.searchText = searchText;
    if (searchText.length === 0) {
      this.msgSearchTextEmpty = true;
      
      return;
    } else {
      this.msgSearchTextEmpty = false;
    }
    
    this.router.navigate(['search', searchText]);    
 
  }

}
