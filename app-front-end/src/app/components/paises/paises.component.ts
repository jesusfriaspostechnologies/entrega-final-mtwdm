import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html'
})
export class PaisesComponent implements OnInit {

  paises: any [] = [];
  constructor(private countriesSvc: CountriesService) {
    this.countriesSvc.getAll().subscribe((data: any[]) =>{
      this.paises = data;
    });
   }

  ngOnInit() {
  }

}
