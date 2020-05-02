import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductModel } from 'src/app/models/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  productList: ProductModel[] = [];
  criterio: string = '';

  constructor(private router:ActivatedRoute,private productSvc: ProductsService, private route2: Router) {
    this.router.params.subscribe(params => {
      this.criterio = params['criterio'];
      this.productSvc.getByCriterio(this.criterio).subscribe((data: ProductModel[]) =>{
        this.productList= data;
      });
    })
   }

  ngOnInit() {
  }

  metodoSearch(event: number){
    console.log(event);
    this.route2.navigate(['/about']);
  }

}
