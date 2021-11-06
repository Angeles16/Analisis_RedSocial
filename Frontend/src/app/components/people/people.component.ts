import { Component, OnInit } from '@angular/core';
import {Router, Params, ActivatedRoute } from '@angular/router';
import {User} from '../../models/user.model';
import {newFriend} from '../../models/friend.model';
import {RegisterService} from '../../services/register.service';
import {FriendService} from '../../services/friend.service'

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  API_URL = 'http://localhost:3000/api/user';

  public identity: any;
  public token: any;
  public page: any;
  public next_page: any;
  public prev_page: any;
  public message!: string;
  public total: any;
  public pages: any;
  public users!: User[];
  public edad!: number;
  public url!: string;

  constructor(private registerService: RegisterService, private router: Router, private route: ActivatedRoute, public friendService: FriendService) { 
    //recoperar datos de login
    this.identity = registerService.getIdentity(); 
    this.token = registerService.getToken();

    
  }

  friend: newFriend = {
    friend: ''
  }

  ngOnInit(): void {
    this.actualPage()
    this.url = '../../../assets/img/user/'
  }

  //metodo para obtener la edad
  obtenerEdad(fN: any){
    let toDate = new Date();
    var diff = toDate.getTime() - fN.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  actualPage(){
    this.route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;
      if(!page){
        page = 1
      }
      if(!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page <= 0 ){
          this.prev_page = this.page;
        }
        
      }

      //devolver listado de usuario
      this.getUsers(this.page)
    })
  }

  public dataRes: any;
  getUsers(page: any){
    this.registerService.getUsers(page).subscribe(
      res => {
        this.dataRes = res;
        if(!res){
          this.message = "error";
        } else {
          this.total = this.dataRes.totalDocs;
          this.page = this.dataRes.totalPages;
          this.users = this.dataRes.docs;
          if(page > this.page){
            this.router.navigate(['/people',1])
          }
          console.log(this.users)
        }
      },
      err => { 
        console.log(err);
        this.message = err;
      }
    )

  }

  addFriend(id: any) {

    this.friendService.newFriend(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('error conchasumadre')
        console.log(err)}
    )
  }

}
