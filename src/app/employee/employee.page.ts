import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categories } from './categories.model';
import { CategorieServive } from './categories.service';
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
  categories:Categories[];
  constructor(private jobService:JobService,private router:Router,private citiesService:CitiesService,private categorisService:CategorieServive) {
    this.jobs=this.jobService.jobs;
    this.cities=this.citiesService.cities;
    this.categories=this.categorisService.categories;
  }

  ngOnInit() {
  }
  onMoreDetail(jobId:string){
    this.router.navigateByUrl('/employee/jobs/'+jobId);
    console.log(jobId);

  }
  onCityClick(cityId:string){
    this.router.navigateByUrl('/employee/filter/'+cityId);
    console.log(cityId);

  }
  onCategoryClick(categoryId:string){
    this.router.navigateByUrl('/employee/filter/'+categoryId);
    console.log(categoryId);

  }

}
