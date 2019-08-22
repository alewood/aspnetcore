import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { CookieService } from 'ngx-cookie-service';
import { PrenotazioneService } from '../shared/prenotazione.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
 userDetails;
 prenotazioni;
  constructor(private cookieService:CookieService,private router:Router,private service:UserService,private preService:PrenotazioneService) { }

  ngOnInit() {
   /* this.service.getUserProfile().subscribe(
     res=> {
        this.userDetails=res;
      },
      err=>{
        console.log(err);
      }
    );
    this.preService.getPrenotazioniPerUtente().subscribe(
      res=> {
        this.prenotazioni=res;

      },
      err=>{
        console.log(err);
      }
    )
    */}
  visualizza(id){
    localStorage.setItem("idPre",id);
    this.router.navigateByUrl("app/prenotazione");
  }

}
