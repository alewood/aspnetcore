import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dettaglio-prenotazione-form',
  templateUrl: './dettaglio-prenotazione-form.component.html',
  styles: []
})
export class DettaglioPrenotazioneFormComponent implements OnInit {

  constructor (private cookieService:CookieService, public service:PrenotazioneService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.prenota().subscribe(
      res=>{
        console.log(res);
        if(res.ok){
          this.toastr.success("La Prenotazione dello strumento è stata aggiunta al carrello","Success!");
          this.router.navigateByUrl('/carrello');

        }

      },
      err=>{
        if(err.status==400){
          this.service.formModel.reset();
          this.toastr.error("Lo Strumento selezionato è già prenotato nel periodo inserito.","Fail!");
        }

      }
    );
      
   
   

        

}

}
