import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styles: []
})
export class UtentiComponent implements OnInit {
utenti;
  constructor(private service:UserService) { }

  ngOnInit() {
    this.service.getUtenti().subscribe(
      res=>{
        this.utenti=res;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
