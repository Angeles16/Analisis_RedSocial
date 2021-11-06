import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {User, Vista} from '../../models/user.model';
import {PublicationsService} from '../../services/publications.service';
import {publication} from '../../models/post.model'
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {FriendService} from '../../services/friend.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'DEGOCOM';
  img: any ;
  public identity!: any;
  public identity2: any;
  public fechaN: any;
  public edad: any;
  
  public dataUserView: Vista = {
    nombre: '',
    apellido: '',
    nick: '',
    fecha_nacimiento: '',
    pais: '',
  };

  

  constructor(private registerService: RegisterService, public publicateService: PublicationsService, public friendService: FriendService) { }

  ngOnInit(): void {
    
    this.identity = this.registerService.getIdentity(); //obtener los datos del usuario identificado en el local storage
    this.getDataUser(); //si
    this.identity2 = this.registerService.getIdentity() //obtener los datos del usuario identificado en el local storage
    this.newPublication();

    this.dataUserView = this.identity2; //manejar los datos dle usuario en un modelo

    //evaluar ruta de imagen de perfil
    this.img = `../../../assets/img/user/${this.identity2.imagen}`; //si

    //obtener edad ==> 
    this.fechaN = this.identity2.fecha_nacimiento //si
    let date = new Date(this.fechaN)
    this.edad = this.obtenerEdad(date);
    this.getPost();

  }

//metodo para obtener la edad
  obtenerEdad(fN: any){
    let toDate = new Date();
    var diff = toDate.getTime() - fN.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  //------------------Almacenar los nuevos datos del usuario ---------------
  getDataUser() {
    this.registerService.getData().subscribe(
      res => {
        this.identity = res;
        localStorage.setItem('identity', JSON.stringify(this.identity.user));
        this.registerService.dataUser = res;
      },
      err => {console.log(err)}
    )
  }



  /*----------------------publicaciones------------------------------*/
  datosPublication: any;
getPost(){
  this.publicateService.getPublication().subscribe(
    res => {
      console.log(res);
      this.datosPublication = res;
      
      this.publicateService.publicaciones = this.datosPublication.publicationData.docs;
      console.log(this.publicateService.publicaciones)
    }, 
    err => {console.log(err)}
  )
}

public dataF: any;
public userF: any;
newPublication(){
  this.friendService.getFriend().subscribe(
    res => {
      this.dataF = res;
      this.userF = this.dataF.friend;
      console.log(this.userF)
    },
    err => {console.log(err)}
  )
}
 


}
