import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import {RegisterService} from '../../services/register.service'
import {User} from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  public status: string | undefined;

  inicio() {
    this.router.navigate(['/login'])
  }

  signup(form: NgForm) {
    console.log(form.value);
    this.registerService.signup(form.value).subscribe(
      res => {
        console.log('==> ' + res),
        form.reset();
        this.inicio();
      }, 
      err => console.log(err)
    )
  }

 

}
