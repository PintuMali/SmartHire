import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Images } from '../app.model';
import { HomeService } from '../app.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  images:Images[];
  isLoading=false;
  isLogin=false;
constructor(private authService:AuthService,private router:Router,private loadingCtrl:LoadingController,private imageService:HomeService){
  this.images=this.imageService.images;
}
  ngOnInit() {
  }
onLogin(){  this.isLoading=true;
  this.authService.login();
  this.loadingCtrl.create({keyboardClose:true,message:'loadinng....'}).then(loadCtrl=>{
    loadCtrl.present();
    setTimeout(()=>{
      this.isLoading=false;
      loadCtrl.dismiss();
      if(this.isLogin){
      this.router.navigateByUrl('/employee/jobs/job-details/resume-submission')
      }
      else{
        this.isLogin=true;
      }
    },1500)
  })
}
onSubmit(form:NgForm){
  if(!form.valid){
    return;
  }
  const email=form.value.email;
  const password=form.value.password;
  const role=form.value.role;
  if(this.isLogin){
    //data send to the login server
  }
  else{
    const firstName=form.value.firstName;
    const lastName=form.value.lastName;

    //data send to the register server
    console.log(email,password,firstName,lastName,role);

  }
}
onSwitchAuthMode(){
this.isLogin=!this.isLogin;
}
}
