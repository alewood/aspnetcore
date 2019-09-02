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
  radioOption="nome";
  isAdmin=this.userService.roleMatch(['Admin']);
  searchText :string="";
  nome="Strumenti";
  page=1;
total=0;
limit=1000;
totalPages;
loading =false;
  @Output() public strumentoEmitter= new EventEmitter();

  constructor(private cookieService:CookieService, private userService:UserService, private toastr:ToastrService, private filter:FilterPipe,private service:StrumentoService,private router:Router) { }

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

  getStrumenti():void{
    this.service.getStrumenti(this.page,this.limit).subscribe(
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
