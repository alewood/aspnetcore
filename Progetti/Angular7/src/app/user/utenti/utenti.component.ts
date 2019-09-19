import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { TouchSequence } from 'selenium-webdriver';
import { Utente } from 'src/app/models/utente';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styles: []
})
export class UtentiComponent implements OnInit {
utenti:Utente[]= [];
nome="Utenti";
self:Utente= new Utente();
isOK;
isAdmin;
page=1;
total=0;
limit=10;
totalPages;
loading =false;
abilita=false;
rimuovi=false;
  constructor(private userService:UserService, private cookieService:CookieService, private toastr:ToastrService, private service:UserService,private router:Router) { }

  ngOnInit() {
    this.getUtenti();
    this.userService.getUserProfile().subscribe(
      res=>{
        console.log(res);
           this.self=res;
      },
      err=>{
        console.log(err);
      }
    );
    this.isAdmin=this.userService.roleMatch(['Admin']);
  }
  resetPwd(id)
  {
    localStorage.setItem("idUtente",id);
    this.router.navigateByUrl("/app/utente/passwordForm");
  }
  rimuoviUtente(userName){
    this.service.rimuoviUtente(userName).subscribe(
      res=>{
        console.log(res);
        if(res.ok){
        this.router.navigateByUrl('/utenti');
        this.toastr.success("L\'utente selezionato è stato rimosso.","La Rimozione ha avuto successo.");}
        else if(res.status==404){
          this.toastr.error("Non è stato trovato l\'utente selezionato.","La Rimozione non ha avuto successo.");
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
  getUtenti(){
    this.service.getUtenti(this.page,this.limit).subscribe(
      res=>{
        this.utenti=res.page.data;
        this.total=res.page.total;
        this.loading =false;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

roleCheck(utente){

  if(this.self.id==utente.id){
    this.rimuovi=false;
  return false;
  
  }
  else{
    if(this.self.userName=="sudo")
    return true;
  if(this.isAdmin){
    this.rimuovi=true;
      return true;
  }
  
     else{
       if(utente.role=='UtenteBase'){
        this.rimuovi=true;
       return true;
       }
       else {
        this.rimuovi=false;
       return false;
       }
     }}
    
   

     
}
userIsAutorizzato(utente){
  this.rimuovi=utente.role=="UtenteAutorizzato"&& !utente.abilitatoAlleNotifiche;
  return utente.role=="UtenteAutorizzato"&& !utente.abilitatoAlleNotifiche;
}
abilitaNotifiche(id){
  this.service.abilitaNotifiche(id).subscribe(
    res=>{
      this.toastr.success("L'Utente è stato abilitato a ricevere le notifiche.","Modifica Avvenuta!");
    }
  );

}
goToPrevious() :void{
  this.page--;
  this.getUtenti();
}
goToNext() :void{
  this.page++;
  this.getUtenti();
}

goToPage(n:number):void{
  this.page=n;
  this.getUtenti();
}


}
