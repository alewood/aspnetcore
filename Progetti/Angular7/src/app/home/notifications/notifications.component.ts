import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(private router:Router,private toastr:ToastrService, private service: StrumentoService) { }
  strumentiLowTtl;
  ngOnInit() {
   this.service.getLowTtl().subscribe(
     res=>{
       this.strumentiLowTtl=res;
     },
     err=>{
       console.log(err);
     }
   );
  }
  dismiss(id){
    this.service.rimuoviStrumento(id).subscribe(
      res=>{
        if(res.ok){
          this.toastr.success("Notifica Eliminata","Lo Strumento non è più prenotabile.");
        }
        console.log(res);
        this.router.navigateByUrl('app/home/notifiche');
      },
      err=>{
        console.log(err);
      }
);

}
}
  

 