import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styles: []
})
export class CarrelloComponent implements OnInit {
  carrello;
  constructor(private service:PrenotazioneService,private router:Router) { }
 
 

  ngOnInit() {
    this.service.getCarrello().subscribe(
      res=>{
        this.carrello=res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
    this.router.navigateByUrl('/carrello');

  
    

  }
  onSubmit(){
   this.service.confermaPrenotazione().subscribe(
    res=>{
      console.log(res);
      
    },
    err=>{
      console.log(err);

    }

   );
   this.router.navigateByUrl('/strumenti');
  
  }

}
