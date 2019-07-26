import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styles: []
})
export class CarrelloComponent implements OnInit {
  carrello;
  constructor(private cookieService: CookieService,private service:PrenotazioneService,private router:Router) { }
 
 

  ngOnInit() {
    this.service.getCarrello().subscribe(
      res=>{
        this.carrello=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    this.router.navigateByUrl('/carrello');
  
    

  }
  onSubmit(){
    if (this.carrello!=null){
   this.service.confermaPrenotazione().subscribe(
    res=>{
      console.log(res);
      
    },
    err=>{
      console.log(err);

    }

   );}
   this.router.navigateByUrl('/strumenti');
  
  }
  rimuoviStrumento(id){
    this.service.rimuoviPrenotazioneStrumento(id).subscribe( 
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    this.router.navigateByUrl('/strumenti');
  }

}
