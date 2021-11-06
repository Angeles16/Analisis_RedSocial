import { Component, OnInit, DoCheck } from '@angular/core';
import {Router} from '@angular/router';
import {User} from './models/user.model';

import {RegisterService} from './services/register.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'DEGOCOM';

  constructor( private registerService: RegisterService, private router:Router ) { }

  
  public identity!: any;
  public token!: string;

  public val!: boolean;

  ngOnInit() {

    this.identity = this.registerService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this.registerService.getIdentity();
  }

  logOut() {
    localStorage.clear();
    this.identity = null;
    this.router.navigate(['/home'])
  }

  editUser(dataUser: User){
    this.registerService.selectedUser = dataUser;
    console.log( this.registerService.selectedUser)
    this.router.navigate(['/edituser']);
  }

}
