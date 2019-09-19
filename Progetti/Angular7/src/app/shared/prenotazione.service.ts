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
  readonly BaseURI= 'https://localhost:5001/api' ;
  formModel=this.fb.group({
    date: [{begin: new Date(2018,6, 5), end: new Date(2018, 9, 25)},Validators.required],
    Posizione:['',Validators.required]
  });
  formModelUpdate=this.fb.group({
    DataFine:['Date',Validators.required]
  });
  form=this.fb.group({
    Ore:['',Validators.required],
    Progetto:['',Validators.required],
    Reparto:['',Validators.required],
    Posizione:['',Validators.required]
  });


  confermaPrenotazione(){
    return this.http.post<Response>(this.BaseURI +'/prenotazione',null,{observe:'response'});
  }
  prenota(){
    console.log(this.formModel.value.date);
    var dataInizio=this.datepipe.transform(this.formModel.value.date.begin,this.format); 
    var dataFine=this.datepipe.transform(this.formModel.value.date.end,this.format);
   console.log(dataFine);
   console.log(dataInizio);
    var body={
      IdStrumento :localStorage.getItem("idStr"),
      IdPrenotazione: null,
      PosizioneUtilizzo: this.formModel.value.Posizione,
      DataInizio:dataInizio,
      DataFine: dataFine,
    

    };
    return this.http.post<Response>(this.BaseURI +'/cart',body,{observe:'response'});
    

  }

  compilaForm(idStr,idPre){
    var body={
      OreUtilizzo:this.form.value.Ore,
      Reparto:this.form.value.Reparto,
      Progetto:this.form.value.Progetto,
      PosizioneRiconsegna:this.form.value.Posizione
    }
    return this.http.put(this.BaseURI+'/prenotazione/'+idStr+'/'+idPre,body,{observe:'response'});
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
  modificaPrenotazione(idStr,idPre){
    var dataFine=this.datepipe.transform(this.formModelUpdate.value.DataFine,this.format);
    var body={
      DataFine:dataFine
    }

       return this.http.put(this.BaseURI+"/dettaglio/"+idStr+"/"+idPre,body,{observe:'response'});

  }
  getDelicate(){
    return this.http.get(this.BaseURI+'/notifiche/delicate',{observe:'body'});
  }
  confermaDelicata(idStr,idPre){
    return this.http.put(this.BaseURI+'/notifiche/'+idStr+'/'+idPre,{observe:'response'});}
    rimuoviDelicata(idStr,idPre){
      return this.http.delete(this.BaseURI+'/dettaglio/'+idStr+'/'+idPre,{observe:'response'});}
    getPrenotazioniPerStrumento(idStr){
      return this.http.get(this.BaseURI+'/prenotazione/'+idStr,{observe:'body'});
    }
}
