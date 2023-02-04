import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.page.html',
  styleUrls: ['./help-center.page.scss'],
})
export class HelpCenterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  hello(){
    alert("Hello");
  }
}
