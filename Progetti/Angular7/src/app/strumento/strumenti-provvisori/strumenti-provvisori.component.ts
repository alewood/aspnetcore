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
radioOption:string="nome";
secondOption:string="modello";
searchText :string="";
searchText2:string="";
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
      Id: str.id,
       PartID:str.partId,
       SerialID:str.serialId,
       Nome:str.nome,
       Marca:str.marca,
       Modello:str.modello,
       Descrizione:str.descrizione,
       Posizione:str.posizione,
       ImgPath:str.ImgPath,
       PDFPath:str.pdfPath,
       Prenotabile:str.prenotabile,
       TTL:str.ttl

    };
    this.service.confermaProv(body).subscribe(
      res=>{
      console.log(res);
      this.toastr.success("Lo Strumento è stato inserito fra gli Strumenti no provvisori!","Conferma avvenuta.");
    },err=>{
      this.toastr.error("ID Duplicati","Fail!");
    }
    );

  }
  clearFilter(){
    this.searchText="";
  }
  clearFilter2(){
    this.searchText2="";
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
