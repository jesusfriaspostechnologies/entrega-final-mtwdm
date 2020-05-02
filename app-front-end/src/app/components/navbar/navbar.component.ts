import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  bredcrumb: any= {};
  constructor(private router: Router) {
    this._getBreadcrumbs().subscribe(event => {
      this.bredcrumb = event;
    });
   }

  ngOnInit() {
  }

  search(criterio: string){
    this.router.navigate(['/search',criterio]);
  }

  _getBreadcrumbs(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
