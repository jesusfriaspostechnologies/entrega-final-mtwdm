// Imoprts Angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// Imports components
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CarsComponent } from './pages/products/cars/cars.component';
import { CategoriesComponent } from './pages/products/categories/categories.component';
import { SearchComponent } from './pages/search/search.component';
import { PaisesComponent } from './components/paises/paises.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Inicio', icon: 'fa-home'} },
    { path: 'about', component: AboutComponent, data: {title: 'Acerca de', icon: ''} },
    {
         path: 'products',
         component: ProductsComponent,
         children:[
            { path: 'cars', component: CarsComponent, data: {title: 'autos', icon: ''} },
            { path: 'categories/:category', component: CategoriesComponent },
            { path: '', redirectTo: 'categories/Cars', pathMatch: 'full' },
            { path: '**', redirectTo: 'categories/Cars', pathMatch: 'full' }
         ],
         data: { title: 'Productos', icon: ''}
    },
    { path: 'product/:code/:category', component: ProductComponent },
    { path: 'search/:criterio', component: SearchComponent },
    { path: 'paises', component: PaisesComponent, data: { title: 'Paises', icon: ''} },
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
