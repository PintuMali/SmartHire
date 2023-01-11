import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Images } from '../app.model';
import { HomeService } from '../app.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  images:Images[];
  isLoading=false;
  isLogin=false;
constructor(private authService:AuthService,private router:Router,private loadingCtrl:LoadingController,private imageService:HomeService,private alertCtrl:AlertController){
  this.images=this.imageService.images;
}
  ngOnInit() {
  }
  authenticate(email:string,password:string){
    this.isLoading=true;
    this.loadingCtrl.create({keyboardClose:true,message:'loadinng....'}).then(loadCtrl=>{
      loadCtrl.present();
      let authObs:Observable<AuthResponseData>;
      if(this.isLogin){
        authObs=this.authService.login(email,password);


      }
      else{
        authObs=this.authService.signup(email,password)


      }
      authObs.subscribe({next:(respData)=>{

          console.log(respData);

          loadCtrl.dismiss();
          this.isLoading=false;
          loadCtrl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover')

      },error:errorResp=>{
        loadCtrl.dismiss();
        const code=errorResp.error.error.message;
        let message='Could not sign you up, please try again.';
        if(code==='EMAIL_EXISTS'){
          message='This email address exists already !';
        }
        else if(code==="EMAIL_NOT_FOUND"){
          message='E-Mail address could not be found.'
        }
        else if(code==='INVALID_PASSWORD'){
          message='This password is not correct.';
        }
        console.log(errorResp.error.error.message)
        this.showAlert(message);
      }})
    });
  }
  onSubmit(form:NgForm){
  if(!form.valid){
    return;
  }
  const email=form.value.email;
  const password=form.value.password;
  const role=form.value.role;
this.authenticate(email,password);
}

private showAlert(message:string){
  this.alertCtrl.create({
    header:'Authentication failed',message:message,buttons:['Okay'],
  }).then(alertEl=>{
    alertEl.present();
  })
}

onSwitchAuthMode(){
this.isLogin=!this.isLogin;
}
}
