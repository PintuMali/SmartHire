import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { log } from 'console';
import { Subscription } from 'rxjs';
import { Job } from 'src/app/employee/job.model';
import { JobsService } from 'src/app/employee/jobs.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit,OnDestroy {
job:Job;
isLoading=false;
jobId:string;
form:FormGroup
fromDate:string;
private jobSub:Subscription;
  constructor(private route:ActivatedRoute,private jobsService:JobsService,private navCtrl:NavController,private router:Router,private loadingCtrl:LoadingController,private alertCtrl:AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paraMap=>{
      if(!paraMap.has('jobId')){
        this.navCtrl.navigateBack('/employee/jobs-posted');
        return;
      }
      this.jobId=paraMap.get('jobId')
      this.isLoading=true;
      this.jobSub=this.jobsService.getJob(paraMap.get('jobId')).subscribe({next:jobs=>{
        this.job=jobs;
        this.fromDate=this.job.jobDeadline.toISOString();
        this.form=new FormGroup({
          salary:new FormControl(this.job.jobSalary,{
            updateOn:'blur',
            validators:[Validators.required,Validators.min(1)]
          }),
          deadlineDate: new FormControl(this.job.jobDeadline,{
            updateOn:'blur',
            validators:[Validators.required]
          }),
          deadline: new FormControl(this.job.jobDeadline,{
            updateOn:'blur',
            validators:[Validators.required]
          }),
          description: new FormControl(this.job.jobDescription,{
            updateOn:'blur',
            validators:[Validators.required,Validators.maxLength(500)]
          }),
          skills:new FormControl(this.job.jobSkills,{

            validators:[Validators.required]
          }),
          experience:new FormControl(this.job.jobExperience,{
            updateOn:'blur',
            validators:[Validators.required]
          })
        });
        this.isLoading=false;
      },error:error=>{
        this.alertCtrl.create({
          header:'An error occurred!',
          message:'Jobs could not be fetched, Please try again later.',
          buttons:[{text:'Okay',handler:()=>{
            this.router.navigate(['/employer/jobs-posted'])
          }}]
        }).then(alertEl=>{
          alertEl.present();
        })
      }});
    });


  }

  ngOnDestroy(): void {
      if(this.jobSub){
       this.jobSub.unsubscribe();
      }
  }

  onUpdateJob(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
    message:'Updating job...'
    }).then(loadingEl=>{
      loadingEl.present();
      this.jobsService.updateJob(this.job.jobId,this.form.value.salary,this.form.value.deadline,this.form.value.description,this.form.value.skills,this.form.value.experience).subscribe(()=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/employer/jobs-posted'])
      });
    });

  }


}
