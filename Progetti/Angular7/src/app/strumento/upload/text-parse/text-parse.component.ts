import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-text-parse',
  templateUrl: './text-parse.component.html',
  styleUrls: ['./text-parse.component.css']
})
export class TextParseComponent implements OnInit {
  public progress: number;
  public message: string;

  @Output() public onParseFinished = new EventEmitter();
  constructor(private http :HttpClient) { }

  ngOnInit() {
  }
  public parseText= (files)=>{
    if (files.length === 0) {
      return;
    }
 
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
 
    this.http.post('https://localhost:5001/api/parse', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onParseFinished.emit(event.body);
          console.log(event.body);
        }
      });
  }
 

}
