import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strumenti-provvisori',
  templateUrl: './strumenti-provvisori.component.html',
  styles: []
})
export class StrumentiProvvisoriComponent implements OnInit {
strumenti;
searchText :string="";
  constructor(private router:Router, private toastr:ToastrService, private service:StrumentoService) { }

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
  clearFilter(){
    this.searchText="";
  }
  rimuoviProv(id){
   this.service.rimuoviProv(id).subscribe(
     res=>{
       console.log(res);
       this.toastr.success("Lo strumento è stato rimosso!","Rimozione avvenuta.");
     }
   );
  }
  pdfOpen(path){
    this.router.navigateByUrl('/strumentiProv');
    window.open('https://localhost:5001/'+path,'_blank');
    
  }

}
