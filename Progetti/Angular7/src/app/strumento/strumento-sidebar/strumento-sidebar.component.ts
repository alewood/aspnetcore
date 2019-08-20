import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-strumento-sidebar',
  templateUrl: './strumento-sidebar.component.html',
  styleUrls: ['./strumento-sidebar.component.css']
})
export class StrumentoSidebarComponent implements OnInit {

  constructor(private service:UserService) { }

  ngOnInit() {
  }

}
