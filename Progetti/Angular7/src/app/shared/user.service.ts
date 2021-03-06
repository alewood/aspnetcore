import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Utente } from '../models/utente';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private fb:FormBuilder,private http: HttpClient) {}
  readonly BaseURI= 'https://localhost:5001/api' ;
  formModel=this.fb.group({
    Username :['',Validators.required],
    Email :['',Validators.email],
   Gruppo:['',Validators.required],
   Roles:['',Validators.required],
   Passwords: this.fb.group({
    Password :['',[Validators.required,Validators.minLength(4)]],
    ConfirmPassword:['',Validators.required]
   },{validator:this.comparePasswords})

 
   
  });
  formPassword=this.fb.group({
    Passwords: this.fb.group({
      Password :['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
     },{validator:this.comparePasswords})
    });
  
  
  comparePasswords( fb:FormGroup){
      let confirmPwdCtrl =fb.get('ConfirmPassword');
      //pwdMismatch
      if(confirmPwdCtrl.errors==null || 'passwordMismatch' in confirmPwdCtrl.errors){
        if(fb.get('Password').value!= confirmPwdCtrl.value)
        confirmPwdCtrl.setErrors({passwordMismatch:true})
        else
        confirmPwdCtrl.setErrors(null)
      }

  }
  register() {
    var body={
      Username: this.formModel.value.Username,
      Email: this.formModel.value.Email,
      Password:this.formModel.value.Passwords.Password,
      Group:this.formModel.value.Gruppo,
      Role:this.formModel.value.Roles
    };
   return this.http.post(this.BaseURI +'/utente/register',body);
  }
  login(formData){
 
    return this.http.post<{token:'', sessionId:''}>(this.BaseURI +'/utente/login',formData,{headers:{"set-cookie": "set-cookie"}  ,observe:'response'});

  }
  getUserProfile()
  {
    return this.http.get<Utente>(this.BaseURI+ '/utente',{observe:'body'});
  }
  roleMatch(allowedRoles) :boolean{
    var isMatch= false;
    var payload=JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole=payload.role;
    allowedRoles.forEach(element => {
      if(userRole ==element){
        isMatch=true;
      }
      
    });

    return isMatch;
  }
  rimuoviUtente(userName){
    return this.http.delete<Response>(this.BaseURI+'/utente/'+userName,{observe:'response'});
  }
  getUtenti(index,pageSize){
    return this.http.get<{page:{data:Utente[],total:number},totalPages:number}>(this.BaseURI+'/utente/'+index+'/'+pageSize,{observe:'body'});
  }
  changePassword(formData){
    return this.http.put<Response>(this.BaseURI+"/utente",formData,{observe:'response'});
  }
  abilitaNotifiche(id)
{
  return this.http.put<Response>(this.BaseURI+"/notifiche/"+id,{observe:'response'});
}
resetPassword(id)
{
  var body={
    Password:this.formPassword.value. Passwords.Password
  } 
  console.log(body);
  return this.http.put(this.BaseURI+'/utente/'+id,body,{observe:'response'});
}


}
