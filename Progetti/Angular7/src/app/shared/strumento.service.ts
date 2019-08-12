import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StrumentoService {

  constructor(private userService:UserService, private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  formModel=this.fb.group({
    Nome:['',Validators.required],
    Descrizione:[''],
    Marca:['',Validators.required],
    Modello:['',Validators.required]
  });

  inserisci(path) {
    var body={
      Nome: this.formModel.value.Nome,
      Descrizione:this.formModel.value.Descrizione,
      Marca:this.formModel.value.Marca,
      Modello:this.formModel.value.Modello,
      Path:path
    };
    if(this.userService.roleMatch(['Admin','UtenteAutorizzato']))
    return this.http.post<Response>(this.BaseURI +'/strumento',body,{observe:'response'});
    else
    return this.http.post<Response>(this.BaseURI +'/strumentoProv',body,{observe:'response'});
  }

  getStrumenti(){
    return this.http.get(this.BaseURI+'/strumento');
  }
  rimuoviStrumento(id){
    return this.http.delete<Response>(this.BaseURI+'/strumento/'+id,{observe:'response'});
  }
  getStrumentiProvvisori(){
    return this.http.get(this.BaseURI+'/strumentoProv');
  }
  confermaProv(str){
    return this.http.post<Response>(this.BaseURI+'/strumentoProv/conferma',str,{observe:'response'});
  }
  rimuoviProv(id){
    return this.http.delete<Response>(this.BaseURI+'/strumentoProv/'+id,{observe:'response'});
  }

}

