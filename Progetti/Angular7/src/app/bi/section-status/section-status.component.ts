import { Component, OnInit } from '@angular/core';
import { BIService } from 'src/app/shared/bi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-status',
  templateUrl: './section-status.component.html',
  styleUrls: ['./section-status.component.css']
})
export class SectionStatusComponent implements OnInit {
  radioOption:string="nome";
  secondOption:string="modello";
  searchText :string="";
  searchText2 :string="";
  constructor(private service:BIService,private router:Router) { }
  strumenti;
  ngOnInit() {
    this.service.getStrumenti().subscribe(
      res=>{
        this.strumenti=res;
        console.log(this.strumenti)
      }
    );
  }

  onClickStrumento(id)
  {
    localStorage.setItem("idStr",id);
    this.router.navigateByUrl("/bi/strumento");

  }
  clearFilter(){
    this.searchText="";
  }
}
