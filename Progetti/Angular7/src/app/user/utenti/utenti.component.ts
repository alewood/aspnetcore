import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styles: []
})
export class UtentiComponent implements OnInit {
utenti;
self;
isOK;
isAdmin;
  constructor(private userService:UserService, private cookieService:CookieService, private toastr:ToastrService, private service:UserService,private router:Router) { }

  ngOnInit() {
    this.service.getUtenti().subscribe(
      res=>{
        this.utenti=res;
      },
      err=>{
        console.log(err);
      }
    );
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
roleCheck(utente){
  if(this.self.id==utente.id)
  return false;
  else{
  if(this.isAdmin)
      return true;
     else{
       if(utente.role=='UtenteBase')
       return true;
       else 
       return false;
     }}

     
}
userIsAutorizzato(utente){
  return utente.role=="UtenteAutorizzato";
}
abilitaNotifiche(id){
  this.service.abilitaNotifiche(id).subscribe(
    res=>{
      this.toastr.success("L'Utente è stato abilitato a ricevere le notifiche.","Modifica Avvenuta!");
    }
  );

}

}
