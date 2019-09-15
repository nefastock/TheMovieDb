import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loadingMovies: boolean;
  moviesToShow: any[] = [];  
  showId: any;
  annio: number;

  categoria: string;  
  annios: any[] = [] ;
  annioSelected: string ;

  constructor(private router: ActivatedRoute, private themoviebd: PeliculasService) {  
    this.annios = ['Mejores en:', '2019', '2018', '2017', '2016', '2015' ] ;
    this.annioSelected = 'Mejores en:'; 
    
    this.loadingMovies = true;
    this.router.params.subscribe( (parametros: any) => {      
      // Default populares       
      if (parametros.categoria === 'populares' || !parametros.categoria ) {        
        this.getMoviesPopular(); 
      } else if (parametros.categoria === 'ninos') {
        this.showChildren();  
      } else if (parametros.categoria === 'cines') {
        this.showCines();
      }
    });
  }

  getMoviesPopular() {
    this.annioSelected = 'Mejores en:';
    this.loadingMovies = true;
    this.themoviebd.getQueryDiscoverSortByPopularity()
                    .subscribe( movies => {      
                      this.moviesToShow = movies;
                      this.loadingMovies = false;
                    });

    this.categoria = 'populares'; 
  }
  
  showPopularities() {
    this.annioSelected = 'Mejores en:';
    this.loadingMovies = true;
    this.themoviebd.getQueryDiscoverSortByPopularity()
                    .subscribe( movies => {      
                      this.moviesToShow = movies;
                      this.loadingMovies = false;
                    });

    this.categoria = 'populares';
  }
  showChildren() {
    this.annioSelected = 'Mejores en:';
    this.loadingMovies = true;
    this.themoviebd.getQueryDiscoverMoviesForChildrenSortByPopularity()
                    .subscribe( movies => {      
                      this.moviesToShow = movies;
                      this.loadingMovies = false;
                    });
    
    
    this.categoria = 'ninos';  
  }
  showCines() { 
    this.annioSelected = 'Mejores en:';
    this.loadingMovies = true;
    this.themoviebd.getQueryDiscoverTheatres()
                    .subscribe( movies => {      
                      this.moviesToShow = movies;
                      this.loadingMovies = false;
                    });

    this.categoria = 'cines';  
  }

  showAnnio(annio: any) {
    this.categoria = '';    
    this.annioSelected = annio;
    this.loadingMovies = true;
    this.themoviebd.getQueryDiscoverByYearSortByVotes(annio) 
                    .subscribe( movies => {      
                      this.moviesToShow = movies;
                      this.loadingMovies = false;
                    });

    
  }
    
  // Para mostrar Popularidad y Votos activando clase css
  popularityAndVotes(indice: any) {
    this.showId = indice;
  }

  ngOnInit() {
  }

}
