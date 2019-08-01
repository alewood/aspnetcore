import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';
import { FilterPipe } from "src/app/filter-pipe";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-strumenti',
  templateUrl: './strumenti.component.html',
  styles: []
})
export class StrumentiComponent implements OnInit {
  strumenti;
  searchText :string="";

  constructor(private toastr:ToastrService, private filter:FilterPipe,private service:StrumentoService,private router:Router) { }

  ngOnInit() {
    this.service.getStrumenti().subscribe(
      res=>{
        this.strumenti=res;
      },
      err=>{
        console.log(err);
      }
    );
  }
  onSubmit(e){
    this.router.navigateByUrl("/dettaglioPrenotazioneForm");
    localStorage.setItem("idStr",e);

  }
  clearFilter(){
    this.searchText="";
  }
  rimuovi(id){
    this.service.rimuoviStrumento(id).subscribe(
           res=>{
             if(res.ok){
               this.toastr.success("Strumento Rimosso","La Rimozione ha avuto successso.");
             }
             this.router.navigateByUrl('/strumenti');
             console.log(res);
           },
           err=>{
             console.log(err);
           }
    );
  }

}
