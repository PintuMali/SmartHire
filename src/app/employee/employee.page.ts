import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jobs } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  jobs:Jobs[]
  constructor(private jobService:JobService,private router:Router) {
    this.jobs=this.jobService.jobs;
  }

  ngOnInit() {
  }
  onMoreDetail(jobId:string){
    this.router.navigateByUrl('/employee/jobs-details');
    console.log(jobId);

  }

}
