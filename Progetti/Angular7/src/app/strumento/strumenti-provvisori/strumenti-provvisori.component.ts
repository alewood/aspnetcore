import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { ToastrService } from 'ngx-toastr';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-strumenti-provvisori',
  templateUrl: './strumenti-provvisori.component.html',
  styles: []
})
export class StrumentiProvvisoriComponent implements OnInit {
strumenti;
  constructor(private toastr:ToastrService, private service:StrumentoService) { }

  ngOnInit() {
    this.service.getStrumentiProvvisori().subscribe(
      res=>{
        console.log(res);
        this.strumenti=res;

    },
    err=> console.log(err));
  }

  confermaStrumento(str){
    var body={
       Id:str.id,
       Nome:str.nome,
       Marca:str.marca,
       Modello:str.modello,
       Descrizione:str.descrizione

    };
    this.service.confermaProv(body).subscribe(
      res=>{
      console.log(res);
      this.toastr.success("Lo Strumento è stato inserito fra gli Strumenti no provvisori!","Conferma avvenuta.");
    });

  }
  rimuoviProv(id){
   this.service.rimuoviProv(id).subscribe(
     res=>{
       console.log(res);
       this.toastr.success("Lo strumento è stato rimosso!","Rimozione avvenuta.");
     }
   )
  }

}
