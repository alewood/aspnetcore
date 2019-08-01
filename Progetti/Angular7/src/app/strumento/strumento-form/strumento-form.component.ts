import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StrumentoService } from 'src/app/shared/strumento.service';

@Component({
  selector: 'app-strumento-form',
  templateUrl: './strumento-form.component.html',
  styleUrls: ['./strumento-form.component.css']
})
export class StrumentoFormComponent implements OnInit {

  constructor(public service:StrumentoService,private toastr:ToastrService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }
  onSubmit(){
    this.service.inserisci().subscribe(
      res =>{
          if(res.ok){
            console.log(res.status);
          this.service.formModel.reset();
          this.toastr.success('Creato nuovo Strumento!','L\'inserimento ha avuto successo!');}
          
      },
         
      err=>{
        console.log(err);

      }
    );

  }


}
