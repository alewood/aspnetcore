import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';
import { FilterPipe } from "src/app/filter-pipe";
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-strumenti',
  templateUrl: './strumenti.component.html',
  styles: []
})
export class StrumentiComponent implements OnInit {
  strumenti;
  current="noFilter";
  radioOption="nome";
  secondOption="modello";
  isAdmin=this.userService.roleMatch(['Admin','UtenteAutorizzato']);
  searchText :string="";
  searchText2:string="";
  nome="Strumenti";
  page=1;
total=0;
limit=100;
totalPages;
loading =false;
  @Output() public strumentoEmitter= new EventEmitter();

  constructor(private cookieService:CookieService, private userService:UserService, private toastr:ToastrService,private service:StrumentoService,private router:Router) { }

  ngOnInit() {
 this.getStrumenti();
 
  }
  onSubmit(e){
    this.router.navigateByUrl("app/strumento/dettaglioPrenotazioneForm");
    localStorage.setItem("idStr",e);

  }
  clearFilter(){
    this.searchText="";
  }
  clearFilter2(){
    this.searchText2="";
  }
  rimuovi(id){
    localStorage.setItem("onClick","false");

    if(this.isAdmin){
    this.service.rimuoviStrumento(id).subscribe(
           res=>{
             if(res.ok){
               this.toastr.success("Strumento Rimosso","La Rimozione ha avuto successso.");
             }
             console.log(res);
             this.router.navigateByUrl('app/strumento/strumenti');
           },
           err=>{
             console.log(err);
           }
    );}
    else{
      this.toastr.error("Non sei autorizzato a rimuovere Strumenti!","Unauthorized.");
      this.router.navigateByUrl('app/strumento/strumenti');

    }
  }
  riserva(id){
    localStorage.setItem("onClick","false");

    if(this.isAdmin){
    this.service.riservaStrumento(id).subscribe(
           res=>{
             if(res.ok){
               this.toastr.success("Strumento Riservato","La Riservazione ha avuto successso.");
             }
             console.log(res);
             this.router.navigateByUrl('app/strumento/strumenti');
           },
           err=>{
             console.log(err);
           }
    );}
    else{
      this.toastr.error("Non sei autorizzato a riservare Strumenti!","Unauthorized.");
      this.router.navigateByUrl('app/strumento/strumenti');

    }
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
  onLogout(){
    localStorage.removeItem('token');
    this.cookieService.delete(".AspNetCore.Session","/user","localhost");
    this.router.navigate(['login'])
  }
  pdfOpen(path){
    localStorage.setItem("onClick","false");
    window.open('https://localhost:5001/'+path,'_blank');

    this.router.navigateByUrl('app/strumento/strumenti');
    
  }
  onClickStrumento(str){
    if(localStorage.getItem("onClick")=="true"){
    localStorage.setItem("idStr",str);
    this.router.navigateByUrl('app/strumento/strumentoView');
    }
    localStorage.setItem("onClick","true");
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
