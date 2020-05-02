import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const PAISES = 'https://restcountries.eu/rest/v2/all';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(PAISES);
  }
}
