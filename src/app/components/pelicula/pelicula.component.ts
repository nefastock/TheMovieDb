import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  movies: any = {};
  loadingMovies: boolean;
  movieFound: any[] = [];
  movieId: any[] = [];
  categoria: string = '';
  
  constructor(private router: ActivatedRoute, private themoviebd: PeliculasService) { 
    this.loadingMovies = true;
    this.router.params.subscribe((parametros: any) => {
      
      if (parametros.id) {
        this.movieId = parametros.id;
      }
      if (parametros.categoria) {
        this.categoria = parametros.categoria;
      }
      this.themoviebd.getQuerySearchById(parametros.id).subscribe((movies: any) => {
        this.movieFound = movies;    
        this.loadingMovies = false;    
      });
    });
  }
    

  ngOnInit() {
  }

}
