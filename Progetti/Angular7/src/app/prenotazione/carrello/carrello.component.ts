import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styles: []
})
export class CarrelloComponent implements OnInit {
  carrello=null;
  constructor(private toastr:ToastrService, private cookieService: CookieService,private service:PrenotazioneService,private router:Router) { }
 
 

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
    this.router.navigateByUrl('app/carrello');

    

  }
  onSubmit(){
    if (this.carrello!=null){
   this.service.confermaPrenotazione().subscribe(
    res=>{
      if(res.ok){
      console.log(res);
      this.toastr.success("Gli strumenti sono stati prenotati!","La Prenotazione ha avuto seccesso.");
      }     
    },
    err=>{
      this.toastr.error("Non hai prenotato alcuno Strumento.","La Prenotazione non ha avuto successo.");
      console.log(err);

    }

   );}
   this.router.navigateByUrl('app/home/prenotazioni');
  
  }
  rimuoviStrumento(id){
    this.service.rimuoviPrenotazioneStrumento(id).subscribe( 
      res=>{
        if(res.ok){
        console.log(res);
       this.toastr.success("La Prenotazione selezionata è stata rimossa.","La Rimozione ha avuto successo.")}
      },
      err=>{
        console.log(err);
      }
    );
    this.router.navigateByUrl('app/strumento/strumenti');
  }
  onLogout(){
    localStorage.removeItem('token');
    this.cookieService.delete(".AspNetCore.Session","/user","localhost");
    this.router.navigate(['login'])
  }

}
