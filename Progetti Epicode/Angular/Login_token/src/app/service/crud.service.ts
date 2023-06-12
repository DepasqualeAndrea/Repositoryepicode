import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../models/products.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

    baseURL = environment.baseUrl;


  constructor(private http: HttpClient ) { }

recupera(){
   return this.http.get<Products[]>( `${this.baseURL}products`);
}

}
