import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifica-prenotazione',
  templateUrl: './modifica-prenotazione.component.html',
  styleUrls: ['./modifica-prenotazione.component.css']
})
export class ModificaPrenotazioneComponent implements OnInit {

  constructor(private router:Router, private service:PrenotazioneService, private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModelUpdate.reset();
  }
  onSubmit()
  {
    var idPre=localStorage.getItem("idPre");
    var idStr=localStorage.getItem("idStr");
    this.service.modificaPrenotazione(idStr,idPre).subscribe(
      res=>{
        this.service.formModelUpdate.reset();
        this.toastr.success("La Prenotazione è stata modificata.","Modifica Avvenuta!");
        this.router.navigateByUrl("app/home/prenotazioniVicine");
      },
      err=>{
        if(err.status==400){
          this.service.formModelUpdate.reset();
          this.toastr.error("Lo Strumento selezionato è già prenotato nel periodo inserito.","Fail!");
        }
      }

    );
  }

}
