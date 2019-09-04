import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

 formModel={
   Username :'',
   Password: ''
 }
  constructor(private cookieService: CookieService,private service: UserService,private router: Router,private toastr:ToastrService) { }
  responseBody ={
   token: '',
  }
  ngOnInit() {
    if(localStorage.getItem('token')!=null)
    this.router.navigateByUrl('/app/home/prenotazioni');
  }
  onSubmit(form: NgForm){
    this.service.login(form.value).subscribe(
      (res) =>{
        this.responseBody= {... res.body}
        let token=this.responseBody.token.toString();
        let session= res.body.sessionId.toString();
        localStorage.setItem('token',token);
        this.cookieService.set(".AspNetCore.Session",session);
        if(this.service.roleMatch(['UtenteBase'])){
          this.router.navigateByUrl('/app/home/prenotazioni');
        }
        else if(this.service.roleMatch(['UtenteAutorizzato'])){
          var user;
          this.service.getUserProfile().subscribe(
            res=>{
              user=res;
              console.log(user);
              if(user.abilitatoAlleNotifiche){
                console.log("ma che è");
                this.router.navigateByUrl('/app/home/notificheStrumento');}
                else{
                console.log("ma che è");
                this.router.navigateByUrl('/app/home/prenotazioni');}
            });
          
        }
        else
            this.router.navigateByUrl('/app/home/notificheStrumento');
            console.log("strumento");
      },
      err => {
        if(err.status== 400)
         this.toastr.error('Incorrect Username or password','Authentication Failed.');
         else
         console.log(err);
      }

    );

  }

}
