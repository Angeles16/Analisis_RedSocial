import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {User, loginUser, token, updateUser} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  API_URL = 'http://localhost:3000/api/user';
  API_FREND = 'http://localhost:3000/api/friends';

  selectedUser: User = {
    nombre: '',
    apellido: '', 
    nick: '',
    fecha_nacimiento: '',
    pais: '',
    email: '',
    password: ''

  }
  
  selectedLogin: loginUser = {
    email: '',
    password: '',
  }

  userEditData: updateUser = {
    nombre: '',
    apellido: '',
    nick: '',
    pais: ''
  }

  public dataUser: any;

  public identity: any;
  public token!: any;
  public imgIg!: any;

  public urlImagenUser: any;

  constructor(public http: HttpClient) {
    this.token = this.getToken();
    this.identity = this.getIdentity();

   }

   rutaImagen(){
    this.urlImagenUser = '../../../assets/img/user/1634695444570-282b6de2345ebb49a2d656d54e0bad5bb40b1001r1-478-592v2_hq.jpg';
    
    //this.urlImagenUser = '../../../../../upload/user/'+this.dataUser.imagen;
   }

  signup(user: User){
    return this.http.post<loginUser>(`${this.API_URL}/signup`, user)
  }

  signin(dataLogin: loginUser){
    return this.http.post(`${this.API_URL}/signin`, dataLogin)
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

  putUser(user: updateUser){
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    console.log(user)
    return this.http.put(`${this.API_URL}/updateuserdata/${user._id}`, user, {headers: headers});
  }

  getImg(ss: any) {
    console.log('asdf', ss)
    return this.http.get(`${this.API_URL}/getimguser/${this.dataUser.user.imagen}`)
  }

  getData() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    return this.http.get(`${this.API_URL}/userlog`, {headers: headers})
  }

  /*==============================================*/
  /* service users paginate */

  getUsers(page = null){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    return this.http.get(`${this.API_URL}/getuserspag/${page}`, {headers: headers})                                    
  }

  getUser(id: string){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
    return this.http.get(`${this.API_URL}/user/${id}`, {headers: headers})     
  }

  newFriend(userFriend: string){
    let data = `"friend: "${userFriend}`
    console.log(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
      return this.http.post(`${this.API_FREND}/newfriend`, data, {headers: headers})
  }

  

}
