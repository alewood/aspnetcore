import { Component, OnInit } from '@angular/core';
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
  isAdmin=this.userService.roleMatch(['Admin']);
  searchText :string="";

  constructor(private cookieService:CookieService, private userService:UserService, private toastr:ToastrService, private filter:FilterPipe,private service:StrumentoService,private router:Router) { }

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
    if(this.isAdmin){
    this.service.rimuoviStrumento(id).subscribe(
           res=>{
             if(res.ok){
               this.toastr.success("Strumento Rimosso","La Rimozione ha avuto successso.");
             }
             console.log(res);
             this.router.navigateByUrl('/strumenti');
           },
           err=>{
             console.log(err);
           }
    );}
    else{
      this.toastr.error("Non sei autorizzato a rimuovere Strumenti!","Unauthorized.");
      this.router.navigateByUrl('/home');

    }
  }
  onLogout(){
    localStorage.removeItem('token');
    this.cookieService.delete(".AspNetCore.Session","/user","localhost");
    this.router.navigate(['login'])
  }

}
