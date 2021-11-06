import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {publication} from '../models/post.model'

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  API_URL = 'http://localhost:3000/api/post';

  public dataUser: any;
  public identity: any;
  public token!: any;

  publicaciones!: publication[];

  constructor(public http: HttpClient) { 
    this.token = this.getToken();
    this.identity = this.getIdentity();

  }

  getIdentity() {
    try {
      let identity = JSON.parse(localStorage.getItem('identity')!);
      
      if(identity !=  undefined) {
        this.identity = identity;
      } else {
        this.identity = null;
      }

      return this.identity;
    } catch (err) {
      console.log(err);
      return err;
    }  
  }

  getToken() {
    try {
      let tokenInt = localStorage.getItem('token');

      if(tokenInt != undefined){
        this.token = tokenInt;
      } else {
        this.token = null;
      }
      return this.token;
    } catch(err) {
      console.log(err);
      return err;
    }
  }

  getPublication(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('auth-token', this.getToken());
    return this.http.get<publication[]>(`${this.API_URL}/getpublication`, {headers: headers})
  }

  newPublication(post: publication){
    return this.http.post<publication>(`${this.API_URL}/newpost`, post);
  }

 


}
