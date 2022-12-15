import { Component } from '@angular/core';
import { Images } from '../app.model';
import { HomeService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  images:Images[];
  constructor(private imageService:HomeService) {
    this.images=imageService.images;
  }

}
