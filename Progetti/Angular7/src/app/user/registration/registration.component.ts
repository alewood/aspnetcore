import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  roles;

  constructor(private router:Router,private cookieService:CookieService, public service:UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
    if(this.service.roleMatch(['Admin']))
      this.roles=['UtenteBase','UtenteAutorizzato'];
      else
      this.roles=['UtenteBase'];
    
  }
  onSubmit(){
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('New user created!','Registration successful.');
        }else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicatedUserName':
      
                this.toastr.error('Username is already taken','Registration failed.');

                
                break;
            
              default:
                
                this.toastr.error(element.description,'Registration failed.');
                break;
            }
            
          });
        }
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

}
