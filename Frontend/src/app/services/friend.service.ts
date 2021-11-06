import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {newFriend} from '../models/friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  API_URL = 'http://localhost:3000/api/friends';

  friend: newFriend = {
    friend: '',
  }

  public identity: any;
  public token: any;
  public friendIdAdd: any;

  constructor(private http: HttpClient) {
    this.token = this.getToken();
    this.identity = this.getIdentity();
    console.log(this.token);
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

  newFriend(userFriend: any){
    let data = `{
      "friend": "${userFriend}"
  }`
    console.log(data)
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('auth-token', this.getToken());
      return this.http.post(`${this.API_URL}/newfriend`, data, {headers : headers})
  }


  getFriend(){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('auth-token', this.getToken());
    return this.http.get(`${this.API_URL}/getfriend`, {headers: headers})
  }

}
