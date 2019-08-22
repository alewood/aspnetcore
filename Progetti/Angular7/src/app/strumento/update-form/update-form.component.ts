import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  public responsePdf: {dbPath: ''};
  public responseImg: {dbPath: ''};
  public descrizione:'';
  constructor(private toastr:ToastrService, private service:StrumentoService) { }
idStrumento;
  ngOnInit() {
   this.idStrumento= localStorage.getItem("idStr");
  }
onSubmit(){
  var pdf=null;
  var img=null;
  var desc=null;
  if(this.responseImg!=null)
      img=this.responseImg.dbPath;
      if(this.responsePdf!=null)
      img=this.responsePdf.dbPath;
      if(this.descrizione!=null)
      img=this.descrizione;
      
    this.service.update(this.idStrumento ,this.responsePdf.dbPath,img,this.descrizione).subscribe(
      res =>{
          if(res.ok){
            console.log(res.status);
          this.service.formModelUpdate.reset();
          this.toastr.success('Strumento Modificato!','La Modifica ha avuto successo!');}
          
      },
         
      err=>{
        console.log(err);

      }
    );

  }
  public uploadFinished = (event) => {
    this.responsePdf = event;
  }
 public uploadImage = (event) =>{
   this.responseImg=event;
 }
 public parseDescrizione = (event) =>{
  this.descrizione=event;
}

}
