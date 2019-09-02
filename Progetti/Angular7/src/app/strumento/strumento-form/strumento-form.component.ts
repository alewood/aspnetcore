import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpEventType, HttpClient, HttpParameterCodec } from '@angular/common/http';
 

@Component({
  selector: 'app-strumento-form',
  templateUrl: './strumento-form.component.html',
  styles: []
})
export class StrumentoFormComponent implements OnInit {
  public responsePdf: {dbPath: ''};
  public responseImg: {dbPath: ''};
  public descrizione: '';

  constructor(private http:HttpClient, private router:Router,private cookieService:CookieService, public service:StrumentoService,private toastr:ToastrService) { }
  
  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    var pdf=null;
  var img=null;
  var desc=null;
  if(this.responseImg!=null)
      img=this.responseImg.dbPath;
      if(this.responsePdf!=null)
      pdf=this.responsePdf.dbPath;
      if(this.descrizione!=null)
      desc=this.descrizione;
    this.service.inserisci(pdf,img,desc).subscribe(
      res =>{
          if(res.ok){
            console.log(res.status);
          this.service.formModel.reset();
          this.toastr.success('Creato nuovo Strumento!','L\'inserimento ha avuto successo!');}
          
      },
         
      err=>{
        console.log(err);

      }
    );

  }
  onLogout(){
    localStorage.removeItem('token');
    this.cookieService.delete(".AspNetCore.Session","/user","localhost");
    this.router.navigate(['login'])
  }
  

public uploadFinished = (event) => {
    this.responsePdf = event;
  }
 public uploadImage = (event) =>{
   this.responseImg=event;
 }
 public parseDescrizione = (event) =>{
  this.descrizione=event;
  console.log(event);
}


}
