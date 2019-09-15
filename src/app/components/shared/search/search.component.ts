import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText: string;
  searchTextInput: string;
  moviesSearch: any = [];
  loadingMovies: boolean;
  msgSearchTextEmpty: boolean;
  msgSearchNoFount = false;

  constructor(private router: ActivatedRoute, private themoviebd: PeliculasService) { 
    
    this.router.params.subscribe((parametros: any) => {
      if (parametros.searchText) {
        this.searchText = parametros.searchText;        
        this.searchMovie(parametros.searchText);   
        this.searchTextInput = parametros.searchText;     
      }      
    });
    
  }

  searchMovie(searchText: string) {

    console.log('Buscando: ' + searchText);
    this.searchText = searchText;
    if (searchText.length === 0) {
      this.msgSearchTextEmpty = true;
      this.moviesSearch = [];
      return;
    } else {
      this.msgSearchTextEmpty = false;
    }

    this.themoviebd.getQuerySearch(searchText).subscribe( movies => {   
      
      if ( movies.length !== 0 ) {
        this.moviesSearch = movies;
        this.loadingMovies = false;
        this.msgSearchNoFount = false;
        
      } else {
        this.moviesSearch = [];
        this.msgSearchNoFount = true;
        this.loadingMovies = false;
      }      
    });

    this.msgSearchNoFount = false;
 
  }

  ngOnInit() {
  }

}
