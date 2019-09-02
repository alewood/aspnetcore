import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BIService {

  constructor(private http:HttpClient) { }
  readonly BaseURI= 'http://localhost:5000/api' ;

  getTop3Strumenti(){
    return this.http.get(this.BaseURI +'/bi',{observe:'body'});
  }
  getStrumenti()
  {
    return this.http.get(this.BaseURI+'/bi/strumenti',{observe:'body'});
  }
  getPrenotazioniPerStrumento(id)
  {
    return this.http.get(this.BaseURI+'/bi/'+id,{observe:'body'});
  }

}
