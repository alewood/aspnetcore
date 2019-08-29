import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';
import { ThemeService } from 'ng2-charts';
import { Strumento } from '../models/strumento';

@Injectable({
  providedIn: 'root'
})
export class StrumentoService {
   
  constructor(private userService:UserService, private fb:FormBuilder,private http:HttpClient, private datepipe:DatePipe) { }
  readonly BaseURI= 'http://localhost:5000/api' ;
  locale: string = 'en-US';
  format: string = 'yyyy-MM-dd';
   date: Date=new Date('01/01/2001');
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
    TTL:[this.date]
  });


  inserisci(pathPdf,pathImg,desc) {
    var ttl=this.datepipe.transform(this.formModel.value.TTL, this.format);
    var descrizione=this.formModel.value.Descrizione;
    if(desc!=null)
       descrizione=desc.text;
    var body={
      Strumento:{
      Nome: this.formModel.value.Nome,
      Descrizione:null,
      Marca:this.formModel.value.Marca,
      Modello:this.formModel.value.Modello,
      TTL:ttl,
      PDFPath:pathPdf,
      ImgPath:pathImg},
      Descrizione:descrizione
    };
    if(this.userService.roleMatch(['Admin','UtenteAutorizzato']))
    return this.http.post<Response>(this.BaseURI +'/strumento',body,{observe:'response'});
    else
    return this.http.post<Response>(this.BaseURI +'/strumentoProv',body,{observe:'response'});
  }
  getStrumento(id){
    return this.http.get(this.BaseURI+'/strumento/' +id);
  }
  getStrumenti(index,pageSize){
    return this.http.get<{page:{data:Strumento[],total:number},totalPages:number}>(this.BaseURI+'/strumento/'+index+'/'+pageSize,{observe:'body'});
  }
  gestisciStrumentoNonPrenotabile(id){
    return this.http.delete<Response>(this.BaseURI+'/notifiche/'+id,{observe:'response'});
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
    var ttl=this.datepipe.transform(this.date, this.format);
    if(this.formModelUpdate.touched){
      ttl=this.datepipe.transform(this.formModelUpdate.value.TTL, this.format);}
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

