import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { map, Subscription } from 'rxjs';
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
  filtered:Job[];
  isLoading=false;
  @ViewChild('searchValue') searchValue:IonSearchbar
  private jobsSub:Subscription;
  constructor(private jobsService:JobsService,private router:Router) {


   }

  ngOnInit() {
    this.jobsSub=this.jobsService.jobs.subscribe(job=>{
      this.jobs=job;
      this.jobs=this.jobs.filter(job=>{
          let receivedDate= new Date(job.jobDeadline).getTime()
          let currentDate=new Date().getTime();
              const timeDifference=Math.abs(receivedDate-currentDate)
            if(timeDifference>604800000){
              job.hasEnoughTime=true;
            }
            else{
              job.hasEnoughTime=false;
              job.jobDeadline=new Date(timeDifference);
            }
            return currentDate<receivedDate;
      })
      this.filtered=this.jobs;
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
    if(this.hasSearchBarOpen){
setTimeout(()=>{
  this.searchValue.setFocus();

},500)
    }

  }
  onCancelClick(e:any){
    this.hasSearchBarOpen=false;
    this.filtered=this.jobs

  }
  onApply(jobId:string){
    this.router.navigateByUrl('/employee/jobs/'+jobId)
  }

search(searchTerm){
    if(searchTerm!=""){
      this.filtered= this.jobs.filter((job)=>{
        let jobSkill:string="";
        for(let skill of job.jobSkills){
          if(skill.toUpperCase()===searchTerm.toUpperCase()){
            jobSkill=skill.toUpperCase();
          }
        }
        return job.jobLocation.toUpperCase()===searchTerm.toUpperCase() || job.companyName.toUpperCase()===searchTerm.toUpperCase() || jobSkill===searchTerm.toUpperCase();
      })
      if(this.filtered.length===0){
        alertController.create({header:'Error 404',
      message:'No matched found!',
      buttons:[{text:'Okay',handler:()=>{
        this.filtered=this.jobs;
        this.searchValue.value='';
        if(this.hasSearchBarOpen){
          setTimeout(()=>{
            this.searchValue.setFocus();

          },500)
              }

      }}]}).then(alertEl=>{
        alertEl.present();
      })
      }
    }
    else{
      alertController.create({header:'Error 404',
      message:'No matched found!',
      buttons:[{text:'Okay',handler:()=>{
        this.filtered=this.jobs;
        if(this.hasSearchBarOpen){
          setTimeout(()=>{
            this.searchValue.setFocus();

          },500)
              }


      }}]}).then(alertEl=>{
        alertEl.present();
      })
    }

}

  ngOnDestroy(): void {
      if(this.jobsSub){
        this.jobsSub.unsubscribe();
      }
  }
}
