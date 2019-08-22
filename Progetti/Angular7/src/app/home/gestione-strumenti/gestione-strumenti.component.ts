import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestione-strumenti',
  templateUrl: './gestione-strumenti.component.html',
  styleUrls: ['./gestione-strumenti.component.css']
})
export class GestioneStrumentiComponent implements OnInit {

  constructor(private toastr:ToastrService, private service:StrumentoService) { }
  strumenti
  ngOnInit() {
    this.service.getStrumentiManutenzione().subscribe(
      res=>{
        this.strumenti=res;
      }
    );
  }
  rendiPrenotabile(id){
    this.service.rimuoviStrumento(id).subscribe(
      res=>{
        this.toastr.success("Lo Strumento è ora prenotabile","Success!")

    },
    err=>{
      console.log(err);
    })
  }
}
