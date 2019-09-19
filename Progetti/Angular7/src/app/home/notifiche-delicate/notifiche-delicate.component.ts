import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifiche-delicate',
  templateUrl: './notifiche-delicate.component.html',
  styleUrls: ['./notifiche-delicate.component.css']
})
export class NotificheDelicateComponent implements OnInit {
 prenotazioni;
  constructor(private service:PrenotazioneService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getDelicate().subscribe(
      res=>{
         this.prenotazioni=res;
      }
    );
  }
  conferma(idStr,idPre)
  {
    this.service.confermaDelicata(idStr,idPre).subscribe(

      res=>{
        this.toastr.success("La Prenotazione è stata confermata","Success!");

      },
      err=>{
        this.toastr.error("Lo Strumento selezionato è già prenotato nel periodo inserito.","Fail!");
      }

    )

  }
  rimuovi(idStr,idPre)
  {
    this.service.rimuoviDelicata(idStr,idPre).subscribe(
      res=>{
        this.toastr.success("La Prenotazione è stata rimossa","Success!");
      }
    )
  }


}
