import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  onApplyClick(){
    this.router.navigateByUrl('/employee/jobs/job-details/resume-submission')
  }

}
