import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  constructor(private router:Router,private authService:AuthService,private alertCtrl:AlertController) { }

  ngOnInit() {
  }
  onApplyClick(){
    this.authService.userIsAuthenticated.pipe(take(1),tap(isAuhenticate=>{
      if(isAuhenticate){
        this.router.navigateByUrl('/employee/jobs/job-details/resume-submission')
      }
      else{
        this.alertCtrl.create({
          header:'Login Required!!!',
          message:'You need to login to apply',
          buttons:[{text:'Okay',handler:()=>{
            this.router.navigate(['/auth'])
          }}]
        }).then(alerEl=>{
          alerEl.present();
        })
      }
    })).subscribe();


  }

}
