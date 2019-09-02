import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent implements OnInit {

  constructor(private service: PrenotazioneService) { }
  prenotazioni: any[];
  page=1;
  total=0;
  limit=10;
  totalPages;
  loading =false;
    ngOnInit() {
    this.getPrenotazioni();
    }
  getPrenotazioni():void{
    this.service.getPrenotazioni(this.page,this.limit).subscribe(
      res=>{
      this.prenotazioni=res.body.page.data;
      this.total=res.body.page.total;
      this.totalPages=res['totalPages'];
      console.log(this.totalPages);
      this.loading=false;
      console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }
    goToPrevious() :void{
      this.page--;
      this.getPrenotazioni();
    }
    goToNext() :void{
      this.page++;
      this.getPrenotazioni();
    }
  
    goToPage(n:number):void{
      this.page=n;
      this.getPrenotazioni();
    }
  
  }
  
