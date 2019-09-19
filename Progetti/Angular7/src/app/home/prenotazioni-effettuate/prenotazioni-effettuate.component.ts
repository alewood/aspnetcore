import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prenotazioni-effettuate',
  templateUrl: './prenotazioni-effettuate.component.html',
  styleUrls: ['./prenotazioni-effettuate.component.css']
})
export class PrenotazioniEffettuateComponent implements OnInit {
prenotazioni;
  constructor(private router:Router, private service:PrenotazioneService) { }

  ngOnInit() {
    this.service.getPrenotazioniPerUtente().subscribe(
      res=>{
        this.prenotazioni=res;
      }
    )
  }
  form(idStr,idPre){
    localStorage.setItem("idStr",idStr);
    localStorage.setItem("idPre",idPre);
    this.router.navigateByUrl("app/home/formRiconsegna");
  }

}
