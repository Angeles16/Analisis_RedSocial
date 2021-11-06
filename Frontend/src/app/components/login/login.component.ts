import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {RegisterService} from '../../services/register.service'
import {User} from '../../models/user.model';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public identity: any;
  public token: any;
  public dataLogin: any;

  //mensajes
  mensaje!: string;

  constructor(public loginService: RegisterService, private router:Router) { }

  ngOnInit(): void {
  }

  signin(form: NgForm) {
    console.log(form.value);
    this.loginService.signin(form.value).subscribe(
      res => {
        this.dataLogin = res;
        if(this.dataLogin[0].token){
          this.token = this.dataLogin[0].token;
          console.log(this.token);

          //persistir token
          localStorage.setItem('token', this.token)
        }
        if(this.dataLogin[1].user){
          this.identity = this.dataLogin[1].user;
          console.log(this.identity);

          //persistir datos del usuario en local storage
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } 
        this.router.navigate(['/'])
        form.reset();
      },
      err => {
        console.log(err);
      }
    )
  }


 

}
