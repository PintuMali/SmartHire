import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading=false;
constructor(private authService:AuthService,private router:Router,private loadingCtrl:LoadingController){}
  ngOnInit() {
  }
onLogin(){  this.isLoading=true;
  this.authService.login();
  this.loadingCtrl.create({keyboardClose:true,message:'loadinng....'}).then(loadCtrl=>{
    loadCtrl.present();
    setTimeout(()=>{
      this.isLoading=false;
      loadCtrl.dismiss();
      this.router.navigateByUrl('/employee/jobs/job-details/resume-submission')
    },1500)
  })
}
}
