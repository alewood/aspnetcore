import { Component, OnInit } from '@angular/core';
import { Prenotazione } from "../../models/prenotazione";
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
@Component({
  selector: 'app-section-prenotazioni',
  templateUrl: './section-prenotazioni.component.html',
  styleUrls: ['./section-prenotazioni.component.css']
})
export class SectionPrenotazioniComponent implements OnInit {

  constructor(private service: PrenotazioneService) { }
prenotazioni: any[];
  ngOnInit() {
    this.service.getPrenotazioni().subscribe(
      res=>{
      this.prenotazioni=res.body.page.data;
      console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

}
