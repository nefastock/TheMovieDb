import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
// Necesario para peticiones y asegurar la petición entre dominios 
import { HttpClientJsonpModule } from '@angular/common/http';
import { PeliculaImagenPipe } from './pipes/pelicula-imagen.pipe';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SearchComponent } from './components/shared/search/search.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoadingComponent } from './components/shared/loading/loading.component';


// Rutas
import {ROUTES} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PeliculaComponent,
    NavbarComponent,
    SearchComponent,
    FooterComponent,
    LoadingComponent,
    PeliculaImagenPipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    // tslint:disable-next-line: max-line-length
    // Añadimos el literal {useHash: true} esto añadirá un # a la ruta, que es un viejo truco de los navegadores para evitar que el navegador recargue la pagina.
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
