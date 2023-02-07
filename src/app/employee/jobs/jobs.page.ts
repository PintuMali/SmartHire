import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from '../job.model';
import { JobsService } from '../jobs.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit,OnDestroy {
  months:string[]=['January','February','March','April','May','June','July','August','September','October','November','December']
  hasSearchBarOpen:boolean=false;
  jobs:Job[];
  isLoading=false;
  private jobsSub:Subscription;
  constructor(private jobsService:JobsService,private router:Router) {


   }

  ngOnInit() {
    this.jobsSub=this.jobsService.jobs.subscribe(jobs=>{
      this.jobs=jobs;
      for(let job of this.jobs){
        let receivedDate=job.jobDeadline.getTime()
        let currentDate=new Date().getTime();
        const timeDifference=Math.abs(receivedDate-currentDate)
        if(timeDifference>604800000){
          job.hasEnoughTime=true;
        }
        else{
          job.hasEnoughTime=false;
          job.jobDeadline=new Date(timeDifference);
        }
      }
    });
  }
  ionViewWillEnter(){
    this.isLoading=true;
    this.jobsService.fetchJobs().subscribe(()=>{
      this.isLoading=false;
    });
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
  ngOnDestroy(): void {
      if(this.jobsSub){
        this.jobsSub.unsubscribe();
      }
  }
}
