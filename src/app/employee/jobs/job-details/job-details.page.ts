import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Job } from '../../job.model';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  job:Job;
  isLoading=false;

  constructor(private route:ActivatedRoute,private navCtrl:NavController,private router:Router,private authService:AuthService,private alertCtrl:AlertController,private jobService:JobsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('jobId')){
        this.navCtrl.navigateBack('/employee/jobs');
        return;
      }
      this.isLoading=true;
       this.jobService.getJob(paramMap.get('jobId'))
      .subscribe({next:job=>{
        this.job=job
        this.isLoading=false;
      },error:error=>{
        this.alertCtrl.create({header:'An error occured!',message:'Could not load job',buttons:[{text:'Okay',handler:()=>{
          this.router.navigate(['/employee/jobs'])
        }}]}).then(alerEl=>{
          alerEl.present();
        })
      }});
    })
  }
  onApplyClick(){
    // this.authService.userIsAuthenticated.pipe(take(1),tap(isAuhenticate=>{
      // if(isAuhenticate){
        this.router.navigateByUrl('/employee/jobs/job-details/resume-submission')
    //   }
    //   else{
    //     this.alertCtrl.create({
    //       header:'Login Required!!!',
    //       message:'You need to login to apply',
    //       buttons:[{text:'Okay',handler:()=>{
    //         this.router.navigate(['/auth'])
    //       }}]
    //     }).then(alerEl=>{
    //       alerEl.present();
    //     })
    //   }
    // })).subscribe();


  }

}
