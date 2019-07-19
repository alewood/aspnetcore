import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strumenti',
  templateUrl: './strumenti.component.html',
  styles: []
})
export class StrumentiComponent implements OnInit {
  strumenti;
  constructor(private service:StrumentoService,private router:Router) { }

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

}
