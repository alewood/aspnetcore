import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazione.component.html',
  styles: []
})
export class PrenotazioneComponent implements OnInit {

dettagliPrenotazione;
  constructor(private service:PrenotazioneService) { }

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

}
