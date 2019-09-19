import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent implements OnInit {

  constructor(private router:Router, private service:UserService, private toastr:ToastrService) { }

  ngOnInit() {
  }
  onSubmit()
  {
    var id=localStorage.getItem("idUtente");
    this.service.resetPassword(id).subscribe(
      res=>{
        this.toastr.success("La Password è stata resettata","Success!");
        this.service.formPassword.reset();
        this.router.navigateByUrl("/app/utente/utenti");
      }
    )

  }
}
