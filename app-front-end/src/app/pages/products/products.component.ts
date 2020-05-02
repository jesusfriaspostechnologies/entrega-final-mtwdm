import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: []
})
export class ProductsComponent implements OnInit, OnDestroy {

  misdatos: ProductModel[] = [];

  constructor(private productsSvc: ProductsService) {
    //this.productsSvc.getAll().subscribe((data: ProductoModel[]) => {
      //this.misdatos = data;
    //})

    this.productsSvc.getByCategory('Ships').subscribe((data: ProductModel[]) =>{
      this.misdatos = data;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(){

  }

}
