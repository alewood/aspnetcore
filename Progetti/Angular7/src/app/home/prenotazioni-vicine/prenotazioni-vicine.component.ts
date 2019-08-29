import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';

@Component({
  selector: 'app-prenotazioni-vicine',
  templateUrl: './prenotazioni-vicine.component.html',
  styleUrls: ['./prenotazioni-vicine.component.css']
})
export class PrenotazioniVicineComponent implements OnInit {

  constructor(private service:PrenotazioneService) { }
   prenotazioni;
  ngOnInit() {
   this.service.getPrenotazioniVicine().subscribe(
     res=>{
       this.prenotazioni=res;
     }
   );
  }

}
