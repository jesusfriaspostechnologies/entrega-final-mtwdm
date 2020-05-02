import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel, Api_R } from '../models/models';
import { Observable } from 'rxjs';

const TODOS_PRODUCTOS = 'http://localhost:3000/products';
const URL_CATEGORIA = 'http://localhost:3000/products/';
const URL_DESCRIPCION = 'http://localhost:3000/descripcion/';
const URL_CODIGO = 'http://localhost:3000/codigo/';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { 

  }

  getAll(){
    return this.http.get(TODOS_PRODUCTOS);
  }

  getByCategory(category: string){
    return new Observable(oberver =>{
      this.http.get(URL_CATEGORIA+category).subscribe((data:Api_R) =>{
        const filter = data.result.productos;
        oberver.next(filter);
      });
    });
  }

  getByCode(code: string){
    return new Observable(oberver =>{
      this.http.get(URL_CODIGO+code).subscribe((data:Api_R) =>{
        const filter = data.result.productos;
        oberver.next(filter[0]);
      });
    });
  }

  getByCriterio(criterio: string){
    return new Observable(oberver =>{
      this.http.get(URL_DESCRIPCION+criterio).subscribe((data:Api_R) =>{
        const filter = data.result.productos;
        oberver.next(filter);
      });
    });
  }

}
