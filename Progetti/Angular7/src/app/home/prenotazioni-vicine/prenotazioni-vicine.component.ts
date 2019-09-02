import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prenotazioni-vicine',
  templateUrl: './prenotazioni-vicine.component.html',
  styleUrls: ['./prenotazioni-vicine.component.css']
})
export class PrenotazioniVicineComponent implements OnInit {

  constructor(private router:Router, private service:PrenotazioneService) { }
   prenotazioni;
  ngOnInit() {
   this.service.getPrenotazioniVicine().subscribe(
     res=>{
       this.prenotazioni=res;
     }
   );
  }

  modifica(idPre,idStr){
    localStorage.setItem("idPre",idPre);
    localStorage.setItem("idStr",idStr);
    this.router.navigateByUrl("/app/home/modificaPrenotazione");
    
  }

}
