import { Component } from '@angular/core';
import { Images } from './app.model';
import { HomeService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  images:Images[]
  constructor(private homeService:HomeService) {
    this.images=homeService.images;
  }
  onLogout(){

  }
}
