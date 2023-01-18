import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/employee/job.model';
import { JobsService } from 'src/app/employee/jobs.service';


@Component({
  selector: 'app-jobs-posted',
  templateUrl: './jobs-posted.page.html',
  styleUrls: ['./jobs-posted.page.scss'],
})
export class JobsPostedPage implements OnInit,OnDestroy {

  jobs:Job[];
  isLoading=false;
  private jobsSub:Subscription
  constructor(private jobsService:JobsService,private router:Router,private loadingCtrl:LoadingController,private alertCtrl:AlertController) {
   }

  ngOnInit() {
    this.jobsSub=this.jobsService.jobs.subscribe(jobs=>{
      this.jobs=jobs;


    });
  }

  ionViewWillEnter(){
    this.isLoading=true;
    this.jobsService.fetchEmployerJobs().subscribe({next:()=>{
      this.isLoading=false;
    },error:errorResp=>{
      console.log(errorResp);

      this.alertCtrl.create({
        header:'An error occurred',
        message:'You need to login first',
        buttons:[{text:'Okay',handler:()=>{
          this.router.navigate(['/auth'])
        }}]
      }).then(alerEl=>{
        alerEl.present();
      })
    }});
  }

  onEdit(jobId:string,slidedItem:IonItemSliding){
    slidedItem.close()
    this.router.navigate(['/employer/jobs-posted/edit-job/',jobId])

  }
  onDelete(jobId:string,slidedItem:IonItemSliding){
    slidedItem.close();
    this.loadingCtrl.create({
      message:'Deleting...'
    }).then(loadingEl=>{
      loadingEl.present();
      this.jobsService.deleteJob(jobId).subscribe(()=>{
        loadingEl.dismiss();
      });
    })
  }
  ngOnDestroy(): void {
      if(this.jobsSub){
        this.jobsSub.unsubscribe();
      }
  }
}
