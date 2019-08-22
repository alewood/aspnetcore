import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StrumentoService {
   
  constructor(private userService:UserService, private fb:FormBuilder,private http:HttpClient, private datepipe:DatePipe) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  locale: string = 'en-US';
  format: string = 'yyyy-MM-dd';
  formModel=this.fb.group({
    Nome:['',Validators.required],
    Descrizione:[''],
    Marca:['',Validators.required],
    Modello:['',Validators.required],
    TTL:['Date',Validators.required]
  });
  formModelUpdate=this.fb.group({
    Nome:[''],
    Descrizione:[''],
    Marca:[''],
    Modello:[''],
    TTL:['Date']
  });


  inserisci(pathPdf,pathImg,desc) {
    var ttl=this.datepipe.transform(this.formModel.value.TTL, this.format);
    var descrizione=this.formModelUpdate.value.Descrizione;
    if(desc!=null)
       descrizione=desc;
    var body={
      Nome: this.formModel.value.Nome,
      Descrizione:descrizione,
      Marca:this.formModel.value.Marca,
      Modello:this.formModel.value.Modello,
      TTL:ttl,
      PDFPath:pathPdf,
      ImgPath:pathImg
    };
    if(this.userService.roleMatch(['Admin','UtenteAutorizzato']))
    return this.http.post<Response>(this.BaseURI +'/strumento',body,{observe:'response'});
    else
    return this.http.post<Response>(this.BaseURI +'/strumentoProv',body,{observe:'response'});
  }
  getStrumento(id){
    return this.http.get(this.BaseURI+'/strumento/' +id);
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
  getLowTtl(){
    return this.http.get(this.BaseURI+'/notifiche');
  }
  update(id ,pathPdf,pathImg,desc){
    var ttl=this.datepipe.transform(this.formModelUpdate.value.TTL, this.format);
    var descrizione=this.formModelUpdate.value.Descrizione;
    if(desc!=null)
       descrizione=desc;
    var body={
      ID: id,
      Nome: this.formModelUpdate.value.Nome,
      Descrizione:descrizione,
      Marca:this.formModelUpdate.value.Marca,
      Modello:this.formModelUpdate.value.Modello,
      TTL:ttl,
      PDFPath:pathPdf,
      ImgPath:pathImg
    };
    return this.http.put<Response>(this.BaseURI +'/strumento/'+id,body,{observe:'response'});
  }
  getStrumentiManutenzione(){
    return this.http.get(this.BaseURI+'/strumentiManutenzione');
  }


}

