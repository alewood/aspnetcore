import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';

@Component({
  selector: 'app-strumenti',
  templateUrl: './strumenti.component.html',
  styles: []
})
export class StrumentiComponent implements OnInit {
  strumenti;
  constructor(private service:StrumentoService) { }

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

}
