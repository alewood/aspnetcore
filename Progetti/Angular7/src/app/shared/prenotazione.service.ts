import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DatePipe} from '@angular/common';
import { Prenotazione } from '../models/prenotazione';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  locale: string = 'en-US';
  format: string = 'yyyy-MM-dd';
 

  constructor(private fb:FormBuilder,private http:HttpClient,private datepipe:DatePipe) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  formModel=this.fb.group({
    DataInizio:['Date',Validators.required],
    DataFine:['Date',Validators.required]
  });


  confermaPrenotazione(){
    return this.http.post<Response>(this.BaseURI +'/prenotazione',null,{observe:'response'});
  }
  prenota(){
    var dataInizio=this.datepipe.transform(this.formModel.value.DataInizio,this.format); 
    var dataFine=this.datepipe.transform(this.formModel.value.DataFine,this.format);
   console.log(dataFine);
   console.log(dataInizio);
    var body={
      IdStrumento :localStorage.getItem("idStr"),
      IdPrenotazione: null,
      DataInizio:dataInizio,
      DataFine: dataFine

    };
    return this.http.post<Response>(this.BaseURI +'/cart',body,{observe:'response'});
    

  }

  getCarrello(){
    return this.http.get(this.BaseURI +'/cart');
  }

  getPrenotazioniPerUtente(){
    return this.http.get(this.BaseURI +'/prenotazione/perUtente');
  }
  getPrenotazione(id){
    return this.http.get(this.BaseURI +'/prenotazione/'+id*1629);
  }
  rimuoviPrenotazioneStrumento(id){
    return this.http.delete<Response>(this.BaseURI+'/cart/'+id,{observe:'response'});
  }
  getPrenotazioni(page,itemsPerPage){
    return this.http.get<{page:{data:Prenotazione[],total:number},totalPages:number}>(this.BaseURI+'/prenotazione/'+page+'/'+itemsPerPage,{observe:'response'});
  }
  getPrenotazioniVicine(){
    return this.http.get(this.BaseURI+'/notifiche/prenotazioni',{observe:'body'});
  }
}
