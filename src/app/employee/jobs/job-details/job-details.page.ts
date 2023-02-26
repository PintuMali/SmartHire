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
  private _currentJobId;
  private _userId:string
  private _fullname:string

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
        this._currentJobId=paramMap.get('jobId')
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
        this.router.navigateByUrl(`/employee/jobs/${this._currentJobId}/resume-submission`)

        




  }

}
