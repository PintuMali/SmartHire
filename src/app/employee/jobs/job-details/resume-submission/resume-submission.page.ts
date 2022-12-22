import { Component, OnInit } from '@angular/core';
import { Images } from 'src/app/app.model';
import { HomeService } from 'src/app/app.service';

@Component({
  selector: 'app-resume-submission',
  templateUrl: './resume-submission.page.html',
  styleUrls: ['./resume-submission.page.scss'],
})
export class ResumeSubmissionPage implements OnInit {

  images:Images[];
  constructor(private imageService:HomeService) {
    this.images=imageService.images;
  }

  ngOnInit() {
  }

}
