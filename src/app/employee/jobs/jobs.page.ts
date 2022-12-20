import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jobs } from '../job.model';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  months:string[]=['January','February','March','April','May','June','July','August','September','October','November','December']
  hasSearchBarOpen:boolean=false;

  jobs:Jobs[];
  constructor(private jobService:JobService,private router:Router) {
    this.jobs=jobService.jobs;
    for(let jobs of this.jobs){
      let receivedDate=new Date(jobs.applybefore)
      let timeDifference=receivedDate.getTime()-new Date().getTime();
      let dateDifference=receivedDate.getDate()-new Date().getDate();
      if(timeDifference>604800000){
        jobs.hasEnoughTime=true;
      jobs.applybefore=receivedDate.getDate().toString()+" "+this.months[receivedDate.getMonth().toString()];
      console.log(dateDifference);

      }
      else{
        jobs.hasEnoughTime=false;
        jobs.applybefore=dateDifference.toString();
      }
    }
   }

  ngOnInit() {
  }
  onSearchBarIconClick(){
    this.hasSearchBarOpen=true;

  }
  onCancelClick(e:any){
    this.hasSearchBarOpen=false;

  }
  onApply(jobId:string){
    this.router.navigateByUrl('/employee/jobs/'+jobId)
  }
}
