import { Component, OnInit } from '@angular/core';
import { StrumentoService } from 'src/app/shared/strumento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-strumento-view',
  templateUrl: './strumento-view.component.html',
  styleUrls: ['./strumento-view.component.css']
})
export class StrumentoViewComponent implements OnInit {
  constructor(private router:Router, private service:StrumentoService) { }
  strumento;
  ngOnInit() {
   var id= localStorage.getItem("idStr");
   this.service.getStrumento(id).subscribe(
     res=>{
     this.strumento=res;
     },
     err=>{
       console.log(err);
     }
   );
    }
    public modificaStrumento(){
      localStorage.setItem("idStr",this.strumento.id);
      this.router.navigateByUrl('app/strumento/updateForm');
    }
    public createImgPath = (serverPath: string) => {
      return 'https://localhost:5001/'+serverPath;
    }


}
