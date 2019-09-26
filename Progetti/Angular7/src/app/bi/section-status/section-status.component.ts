import { Component, OnInit } from '@angular/core';
import { BIService } from 'src/app/shared/bi.service';
import { Router } from '@angular/router';
import { StrumentoService } from 'src/app/shared/strumento.service';

@Component({
  selector: 'app-section-status',
  templateUrl: './section-status.component.html',
  styleUrls: ['./section-status.component.css']
})
export class SectionStatusComponent implements OnInit {
  current="noFilter";
  radioOption:string="nome";
  secondOption:string="modello";
  searchText :string="";
  searchText2 :string="";
  constructor(private service: StrumentoService,private router:Router) { }
  strumenti;
  nome="Strumenti";
  page=1;
total=0;
limit=100;
totalPages;
loading =false;
  ngOnInit() {
 this.getStrumenti();
  }

  onClickStrumento(id)
  {
    localStorage.setItem("idStr",id);
    this.router.navigateByUrl("/bi/strumento");

  }
  clearFilter(){
    this.searchText="";
  }
  clearFilter2(){
    this.searchText2="";
  }
  getStrumenti():void{
    if(this.current=="filter"){
    this.service.getStrumenti(this.page,this.limit,this.radioOption,this.searchText,this.secondOption,this.searchText2).subscribe(
      res=>{
        this.strumenti=res.page.data;
        this.total=res.page.total;
        this.loading=false;
      },
      err=>{
        console.log(err);
      }
    );}
    else if(this.current=="noFilter"){
      this.service.getStrumentiNoFilter(this.page,this.limit).subscribe(
        res=>{
          this.strumenti=res.page.data;
          this.total=res.page.total;
          this.loading=false;
     
        });
    }
    else if(this.current=="singleFilter"){
      this.service.getStrumentiSingleFilter(this.page,this.limit,this.radioOption,this.searchText).subscribe(
        res=>{
          this.strumenti=res.page.data;
          this.total=res.page.total;
          this.loading=false;
        },
        err=>{
          console.log(err);
        }

    );


    }
  }
  filter(){
    if(this.searchText==""&&this.searchText2==""){
     this.current="noFilter";
    this.getStrumenti();
  }
  else if(this.searchText2==""){
    this.current="singleFilter";
    this.getStrumenti();
  }
  else{
    this.current="filter";
    this.getStrumenti();
  }
}
goToPrevious() :void{
  this.page--;
  this.getStrumenti();
}
goToNext() :void{
  this.page++;
  this.getStrumenti();
}

goToPage(n:number):void{
  this.page=n;
  this.getStrumenti();
}
}
