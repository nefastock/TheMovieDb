import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  // tslint:disable-next-line: no-inferrable-types
  private urlApi: string = 'https://api.themoviedb.org/3';
  // tslint:disable-next-line: no-inferrable-types
  private apiKey: string = 'f41f708af6b2da5e618445dd1d117053';

  // Constructor con mensaje por consola solo para saber que llegó
  constructor(private http: HttpClient) { console.log('Service Listo'); }

  // Base de nuestra solicitud a la API
  getQuery(query: string) {
    const url = `${ this.urlApi }${ query }&api_key=${ this.apiKey }`;
    // Intenté con GET sin embargo da error de cross domain
    return this.http.jsonp(url, 'callback');
  }
  // Base de nuestra solicitud a la API
  getQueryForId(query: string) {
    const url = `${ this.urlApi }${ query }?api_key=${ this.apiKey }`;
    // Intenté con GET sin embargo da error de cross domain
    return this.http.jsonp(url, 'callback');
  }

  // Opción 1: Buscamos las peliculas más populares
  getQueryDiscoverSortByPopularity() {
    return this.getQuery(
      `/discover/movie?sort_by=popularity.desc`
    ).pipe(map((data: any) => data.results));
  }

  

  // Opción 3: Buscamos las peliculas con filtro  y ordenamos por popularidad
  getQuerySearch(termino: string) {
    return this.getQuery(
      `/search/movie?query=${termino}&sort_by=popularity.desc`
    ).pipe(map((data: any) => data.results));
  }

  // Opción 4: Buscamos las peliculas por id
  getQuerySearchById(id: string) {
    console.log('id buscado: ' + id);
    return this.getQueryForId(
      `/movie/${id}&language=es`
    ).pipe(map((data: any) => data));
  }

  // Opción 5: Buscamos las peliculas por id pero usando find como indica la documentación de TheMovieDb
  getQueryFindById(id: string) {
    
    return this.getQuery(
      `/find/${id}&external_source=imdb_id`
    ).pipe(map((data: any) => data));
  }


  // Opción 6: Buscamos las peliculas populares infantiles (G)
  getQueryDiscoverMoviesForChildrenSortByPopularity() {
    return this.getQuery(
      `/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&language=es-ES`
    ).pipe(map((data: any) => data.results));
  }

  // Opción 7: Buscamos las peliculas en cines ultimos 7 días
  getQueryDiscoverTheatres() {
    const desde = new Date();
    const hasta = new Date();
    desde.setDate(hasta.getDate());
    hasta.setDate(hasta.getDate() + 7); //semana
    const desdeStr = `${ desde.getFullYear() }-${ ('0' + (desde.getMonth() + 1)).slice(-2) }-${ ('0' + desde.getDate()).slice(-2) }`;
    const hastaStr = `${ hasta.getFullYear() }-${ ('0' + (hasta.getMonth() + 1)).slice(-2) }-${ ('0' + hasta.getDate()).slice(-2) }`;

    return this.getQuery(
      

      `/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&language=es-ES`
    ).pipe(map((data: any) => data.results));
  }

   // Opción 7: Buscamos las mejores peliculas por año
   getQueryDiscoverByYearSortByVotes(annio: number) {   

    return this.getQuery(
      `/discover/movie?primary_release_year=${annio}&sort_by=vote_average.desc`
    ).pipe(map((data: any) => data.results));
  }

  

 
  



}
