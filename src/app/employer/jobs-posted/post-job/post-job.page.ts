import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { title } from 'process';
import { JobsService } from 'src/app/employee/jobs.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.page.html',
  styleUrls: ['./post-job.page.scss'],
})
export class PostJobPage implements OnInit {
  form:FormGroup;
  fromDate:string;
  toDate:string;
  constructor(private jobService:JobsService,private router:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.form=new FormGroup({
      title:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      profile:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      salary:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.min(1)]
      }),
      deadline: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description: new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required,Validators.maxLength(500)]
      }),
      skills:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      experience:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      location:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      jobType:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      })
    });
  }
  onCreateJob(){
    if(!this.form.valid){
      return;
    }
    this.loadingCtrl.create({
      message:'Creating a job...'
    }).then(loadingEl=>{
      loadingEl.present();

      this.jobService.addJob(this.form.value.title,this.form.value.profile,this.form.value.salary,this.form.value.deadline,this.form.value.description,this.form.value.skills,this.form.value.experience,this.form.value.location,this.form.value.jobType).subscribe(()=>{
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/employer/jobs-posted'])
      });
    })

  }
}
