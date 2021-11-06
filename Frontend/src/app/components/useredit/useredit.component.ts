import { Component, OnInit,  } from '@angular/core';
import {Router} from '@angular/router'
import {NgForm} from '@angular/forms';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

import {User} from '../../models/user.model';
import {RegisterService} from '../../services/register.service';
import { DomSanitizer } from '@angular/platform-browser';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  public user!: User;

  public data!: String;
  public identity: any;
  public token: any;

  constructor(public registerService: RegisterService, private router: Router, private sanitizer: DomSanitizer, public uploadService: UploadService) {

    this.identity = registerService.getIdentity();
    this.token = registerService.getToken();
   }

  ngOnInit(): void {

  }



  updateUser(userUp: NgForm){
    console.log(userUp.value);
    this.registerService.putUser(userUp.value).subscribe(
      res => {
        userUp.reset()
      },
      err => { console.log(err) }
    )
  }

  public previsualizacion!: string;
  public arvhivo: any = [];
  public file!: Array<File>; //DATO DE LA IMAGEN 

  onPhotoSelect(event: any): void{
    const archivoCapt = event.target.files[0];
    this.file = <Array<File>>event.target.files;
    this.extraerBase64(archivoCapt).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    });
    this.arvhivo.push(archivoCapt);
  } 


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })


  sendFile(img: HTMLInputElement): any{
    console.log(img.value)
    const formularioDeDatos = new FormData();
    this.arvhivo.forEach((archivo: any) => {
      console.log(archivo);
      formularioDeDatos.append('avatar', archivo);
      this.uploadService.enviarImagen(archivo).subscribe(
        res => {
          this.router.navigate(['/home'])
        }, 
        err => {console.log(err)}
      );
    })
  }



  uri = 'http://localhost:3000/api/user/uploaduserimg/'
  newSaveImg() {
    this.uploadService.nuevaFoto(this.uri + this.identity._id, [], this.file, this.token, 'avatar')
                      .then((result: any) => {
                        console.log(result);
                       

                      });
  }
  

}
