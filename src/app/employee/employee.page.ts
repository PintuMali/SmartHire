import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { map, Subscription } from 'rxjs';
import { Categories } from './categories.model';
import { CategorieServive } from './categories.service';
import { Cities } from './cities.model';
import { CitiesService } from './cities.service';
import { Job } from './job.model';
import { JobsService } from './jobs.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit,OnDestroy {
  jobs:Job[];
  isLoading=false;
  cities:Cities[];
  categories:Categories[];
  private jobsSub:Subscription;
  firstname: string;
  lastname: string;

  constructor(public authService: AuthService,private jobService:JobsService,private router:Router,private citiesService:CitiesService,private categorisService:CategorieServive,private alertCtrl:AlertController) {

    this.cities=this.citiesService.cities;
    this.categories=this.categorisService.categories;
  }

  ngOnInit() {
    this.jobsSub=this.jobService.jobs.subscribe(jobs=>{
      this.jobs=jobs

    this.authService.userDetail().subscribe((res:any) => {
      this.firstname = res[Object.keys(res)[0]].firstName;
      this.lastname = res[Object.keys(res)[0]].lastName;
    });

    });
  }
  ionViewWillEnter(){
    this.isLoading=true;
    this.jobService.fetchJobs().subscribe({next:()=>{
      this.isLoading=false;
    },error:errorEl=>{
      this.alertCtrl.create({
        header:'An error occurred!',
        message:'Check Your Connection,try again later',
        buttons:[{text:'Okay',handler:()=>{
          this.router.navigate(['/auth']);
        }}]
      }).then(alertEl=>{
        alertEl.present();
      })
    }});
  }

  onMoreDetail(jobId:string){
    this.router.navigateByUrl('/employee/jobs/'+jobId);

  }
  onCityClick(cityName:string,filter:string){
    this.jobService.filter=filter
    this.router.navigateByUrl('/employee/filter/'+cityName);

  }
  onCategoryClick(categoryId:string,filter:string){
    this.jobService.filter=filter
    this.router.navigateByUrl('/employee/filter/'+categoryId);

  }
  ngOnDestroy(): void {
      if(this.jobsSub){
        this.jobsSub.unsubscribe();
      }
  }

}
