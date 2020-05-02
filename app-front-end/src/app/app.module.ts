// Modulos angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// Components app
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// rutas app
import { AppRoutingModule } from './app.routes';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { CardsComponent } from './components/cards/cards.component';
import { PaisesComponent } from './components/paises/paises.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ProductsComponent,
    ProductComponent,
    PageNotFoundComponent,
    CarsComponent,
    CategoriesComponent,
    SearchComponent,
    CardsComponent,
    PaisesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
