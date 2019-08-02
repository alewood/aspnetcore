import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styles: []
})
export class PrenotazioneComponent implements OnInit {

dettagliPrenotazione;
  constructor(private router:Router,private cookieService:CookieService, private service:PrenotazioneService) { }

  ngOnInit() {
    this.service.getPrenotazione(localStorage.getItem("idPre")).subscribe(
      res=>{
             this.dettagliPrenotazione=res;

      },
      err=>{
        console.log(err);
      }

    );
    localStorage.removeItem("idPre");
  }
  onLogout(){
    localStorage.removeItem('token');
    this.cookieService.delete(".AspNetCore.Session","/user","localhost");
    this.router.navigate(['login'])
  }

}
