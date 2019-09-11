import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-pwd-form',
  templateUrl: './change-pwd-form.component.html',
  styles: []
})
export class ChangePwdFormComponent implements OnInit {

  constructor(private cookieService:CookieService, private toastr:ToastrService, private fb:FormBuilder,private service:UserService,private router:Router) { }
  formModel=this.fb.group({

    OldPassword :['',[Validators.required,Validators.minLength(4)]],
    Passwords:this.fb.group({
    NewPassword :['',[Validators.required,Validators.minLength(4)]],
    ConfirmNewPassword:['',Validators.required]},
    {validator:this.comparePasswords})
    
 
   
  });
  ngOnInit() {
  }
  comparePasswords( fb:FormGroup){
    let confirmPwdCtrl =fb.get('ConfirmNewPassword');
    //pwdMismatch
    if(confirmPwdCtrl.errors==null || 'passwordMismatch' in confirmPwdCtrl.errors){
      if(fb.get('NewPassword').value!= confirmPwdCtrl.value)
      confirmPwdCtrl.setErrors({passwordMismatch:true})
      else
      confirmPwdCtrl.setErrors(null)
    }
}
onSubmit(){
  var body={
    oldPassword:this.formModel.value.OldPassword,
    newPassword:this.formModel.value.Passwords.NewPassword
  };
  this.service.changePassword(body).subscribe(
    res=>{
      console.log(res);
      if(res.ok){
      this.router.navigateByUrl('/app/home/prenotazioni');
       this.toastr.success("Password modificata!","La Modifica ha avuto successo.");}
     
    },
    err=>{
      if (err.status==400){
        this.toastr.error("La Password inserita non è corretta","La Modifica non ha avuto successo.")
      }
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
