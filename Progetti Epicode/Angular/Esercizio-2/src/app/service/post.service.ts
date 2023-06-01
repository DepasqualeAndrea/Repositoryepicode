import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }


  async getPosts()
   {
    return (await fetch('assets/db.json')).json();
  }

}
