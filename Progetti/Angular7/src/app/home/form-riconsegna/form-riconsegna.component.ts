import { Component, OnInit } from '@angular/core';
import { PrenotazioneService } from 'src/app/shared/prenotazione.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-riconsegna',
  templateUrl: './form-riconsegna.component.html',
  styleUrls: ['./form-riconsegna.component.css']
})
export class FormRiconsegnaComponent implements OnInit {

  constructor(private service:PrenotazioneService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
  }
onSubmit(){
  var idStr=localStorage.getItem("idStr");
  var idPre=localStorage.getItem("idPre");
  this.service.compilaForm(idStr,idPre).subscribe(
    res=>{
      this.toastr.success("Grazie per aver compilato la Form!","Form Consegnata!");
    }
  );
  this.router.navigateByUrl("app/home/prenotazioniEffettuate")
}
}
