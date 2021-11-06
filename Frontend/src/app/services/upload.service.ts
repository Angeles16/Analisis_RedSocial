import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  API_URL = 'http://localhost:3000/api/user';

  public identity: any;
  public token!: any;

  constructor(private http: HttpClient) { }

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


  enviarImagen(formData: FormData){
    
    let params = this.getIdentity();
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    return this.http.post(`${this.API_URL}/updateuserdata/${params._id}`, {avatar: formData, headers: headers});
  }


  createFoto(photo: File){
    let params = this.getIdentity();
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    console.log(params._id)
    console.log(photo)

    const fd = new FormData();
    fd.append('avatar', photo);
    return this.http.post(`${this.API_URL}/uploaduserimg/${params._id}`, fd, {headers: headers})
  }

//Este funciona para almacenar las fotos en la DB
  nuevaFoto(url: string, params: Array<string>, files: Array<File>, token: string, name: string){
    return new Promise(function(resolve, reject){
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      for(let i=0; i<files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('POST', url, true);
      xhr.setRequestHeader('auth-token', token);
      xhr.send(formData);

    });
  };

  
}
