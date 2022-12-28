import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Jobs } from './jobs.model';
import { JobsService } from './jobs.service';

@Component({
  selector: 'app-jobs-posted',
  templateUrl: './jobs-posted.page.html',
  styleUrls: ['./jobs-posted.page.scss'],
})
export class JobsPostedPage implements OnInit {

  jobs:Jobs[];
  constructor(private jobsService:JobsService,private router:Router) {
    this.jobs=this.jobsService.jobs;
   }

  ngOnInit() {
  }
  onEdit(jobId:string,slidedItem:IonItemSliding){
    slidedItem.close()
    this.router.navigate(['/employer/jobs-posted/edit-job/',jobId])

  }
}
