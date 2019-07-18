import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StrumentoService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  formModel=this.fb.group({
    Nome:['',Validators.required],
    Descrizione:[''],
    Marca:['',Validators.required],
    Modello:['',Validators.required]
  });

  inserisci() {
    var body={
      Nome: this.formModel.value.Nome,
      Descrizione:this.formModel.value.Descrizione,
      Marca:this.formModel.value.Marca,
      Modello:this.formModel.value.Modello
    };
    return this.http.post(this.BaseURI +'/strumento',body);
  }

  getStrumenti(){
    return this.http.get(this.BaseURI+'/strumento');
  }


}

