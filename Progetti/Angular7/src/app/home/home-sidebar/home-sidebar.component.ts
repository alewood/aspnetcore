import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit {
  user;
  constructor(private service:UserService) { }
   
  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res=>{
        this.user=res;
      }
    )
  }
abilitato(){
  if(this.service.roleMatch(['Admin']))
     return true;
     else if(this.service.roleMatch(['UtenteAutorizzato']))
       return  this.user.abilitatoAlleNotifiche;

  else
   return false;
}
}
