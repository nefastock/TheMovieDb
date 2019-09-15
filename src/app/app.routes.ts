import {Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PeliculaComponent} from './components/pelicula/pelicula.component';
import {SearchComponent} from './components/shared/search/search.component';


export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:categoria', component: HomeComponent },
  { path: 'search', component: SearchComponent }, 
  { path: 'search/:searchText', component: SearchComponent },
  { path: 'movie/:id/:categoria', component: PeliculaComponent },   
  { path: '', pathMatch: 'full', redirectTo: 'home' },  
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];
