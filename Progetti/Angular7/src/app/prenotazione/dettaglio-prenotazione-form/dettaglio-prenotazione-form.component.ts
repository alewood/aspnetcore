import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettaglio-prenotazione-form',
  templateUrl: './dettaglio-prenotazione-form.component.html',
  styles: []
})
export class DettaglioPrenotazioneFormComponent implements OnInit {

  constructor(public service:PrenotazioneService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.prenota().subscribe(result =>
      {console.log(result)}
    );
      
    this.router.navigateByUrl('/carrello');
   

        

}
}
