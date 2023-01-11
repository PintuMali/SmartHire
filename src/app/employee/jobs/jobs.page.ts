import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Job } from '../job.model';
import { JobsService } from '../job.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit,OnDestroy {
  months:string[]=['January','February','March','April','May','June','July','August','September','October','November','December']
  hasSearchBarOpen:boolean=false;
  hasEnoughTime=true;
  jobs:Job[];
  isLoading=false;
  private jobsSub:Subscription;
  constructor(private jobsService:JobsService,private router:Router) {


   }

  ngOnInit() {
    this.jobsSub=this.jobsService.jobs.subscribe(jobs=>{
      this.jobs=jobs;
      // for(let jobs of this.jobs){
      //   let receivedDate=new Date(jobs.jobDeadline)
      //   let timeDifference=receivedDate.getTime()-new Date().getTime();
      //   let dateDifference=receivedDate.getDate()-new Date().getDate();
      //   console.log(receivedDate,'r');
      //   console.log(timeDifference,'td');
      //   console.log(dateDifference,'dd');

      //   if(timeDifference>604800000){
      //     this.hasEnoughTime=true;
      //   jobs.jobDeadline=new Date(receivedDate.getDate().toString()+" "+this.months[receivedDate.getMonth().toString()]);
      //   console.log(jobs.jobDeadline,'1');


      //   }
      //   else{
      //     this.hasEnoughTime=false;
      //     jobs.jobDeadline=new Date(dateDifference.toString());
      //     console.log(jobs.jobDeadline,'2');
      //   }
      // }
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
