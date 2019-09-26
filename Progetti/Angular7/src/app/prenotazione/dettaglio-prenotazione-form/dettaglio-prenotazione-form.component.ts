import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import {Moment} from 'moment/moment'
import { SatDatepicker } from 'saturn-datepicker';
import { MatInput } from '@angular/material';
@Component({
  selector: 'app-dettaglio-prenotazione-form',
  templateUrl: './dettaglio-prenotazione-form.component.html',
  styles: []
})
export class DettaglioPrenotazioneFormComponent implements OnInit {
prenotazioniAttive;
  constructor (private datePipe:DatePipe, private cookieService:CookieService, public service:PrenotazioneService,private toastr:ToastrService,private router:Router) { }
minDate=this.datePipe.transform(Date.now(),'yyyy-MM-dd');
toReset=true;


  ngOnInit() {
    this.toReset=true;
    this.prenotazioniAttive=null;
    this.getPrenotazioni();
    this.service.formModel.reset();
   

  }

dateClass =(d:Date) =>{
return !this.myFilter(d) ? 'custom_date_class': undefined;

}
 
myFilter = (d: Date): boolean => {  
    var result=true;
    var date=this.datePipe.transform(d,'yyyy-MM-dd');
    this.prenotazioniAttive.forEach(p => {

var inizio=this.datePipe.transform(p.dataInizio,'yyyy-MM-dd');
var fine=this.datePipe.transform(p.dataFine,'yyyy-MM-dd');
      if(date==inizio ||date==fine)
      result=false;

      else if(date>=p.dataInizio&&date<=p.dataFine){
         result=false;
       }
      

      
    });
    return result;
 
    
   
   
  }



 
  reset(dp:SatDatepicker<Date>){
    if(this.toReset){
    console.log("this.reset");
  
 this.toReset=false;
   }

  }
  getPrenotazioni(){
  this.service.getPrenotazioniPerStrumento(localStorage.getItem("idStr")).subscribe(

    res=>{
      this.prenotazioniAttive=res;
      console.log(res);
    });}
  onSubmit(){
    this.service.prenota().subscribe(
      res=>{
        console.log(res);
        if(res.ok){
          this.toastr.success("La Prenotazione dello strumento è stata aggiunta al carrello","Success!");
          this.router.navigateByUrl('app/strumento/strumenti');

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
