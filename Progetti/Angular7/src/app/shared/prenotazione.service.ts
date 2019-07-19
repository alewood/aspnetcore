import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {
  locale: string = 'en-US';
  format: string = 'yyyy-MM-dd'
 

  constructor(private fb:FormBuilder,private http:HttpClient,private datepipe:DatePipe) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  formModel=this.fb.group({
    DataInizio:['Date',Validators.required],
    DataFine:['Date',Validators.required]
  });
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
    return this.http.post(this.BaseURI +'/cart',body);
    

  }

  getCarrello(){
    return this.http.get(this.BaseURI +'/cart');
  }
}