import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from './cities.model';
import { CitiesService } from './cities.service';
import { Jobs } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  jobs:Jobs[];
  cities:Cities[];
  constructor(private jobService:JobService,private router:Router,private citiesService:CitiesService) {
    this.jobs=this.jobService.jobs;
    this.cities=this.citiesService.cities;
  }

  ngOnInit() {
  }
  onMoreDetail(jobId:string){
    this.router.navigateByUrl('/employee/jobs-details');
    console.log(jobId);

  }
  onCityClick(cityId:string){
    this.router.navigateByUrl('/employee/jobs');
    console.log(cityId);

  }

}
