import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-parse',
  templateUrl: './text-parse.component.html',
  styleUrls: ['./text-parse.component.css']
})
export class TextParseComponent implements OnInit {
  descrizione;
  message

  @Output() public onParseFinished = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  public parseText= (files)=>{
    var file= files[0];

    var reader = new FileReader();
    reader.readAsText(file);
    var me = this;
    reader.onload = function () {
      me.descrizione = reader.result as string;

    } 
    this.message=this.descrizione;
    console.log(this.descrizione);
    this.onParseFinished.emit(this.descrizione);
  }
 

}
