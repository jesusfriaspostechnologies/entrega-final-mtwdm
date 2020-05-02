import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {

  misdatos: ProductModel[] = [];

  constructor(private productsSvc: ProductsService) {
    //this.productsSvc.getAll().subscribe((data: ProductoModel[]) => {
      //this.misdatos = data;
    //})

    this.productsSvc.getByCategory('Cars').subscribe((data: ProductModel[]) =>{
      this.misdatos = data;
    });
  }


  ngOnInit() {
  }

}
