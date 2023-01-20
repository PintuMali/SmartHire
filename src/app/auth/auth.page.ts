import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Images } from '../app.model';
import { HomeService } from '../app.service';
import { AuthResponseData, AuthService, EmailVerifySendResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  images:Images[];
  isLoading=false;
  isLogin=true;
  @ViewChild(IonModal) modal: IonModal;
constructor(private authService:AuthService,private router:Router,private loadingCtrl:LoadingController,private imageService:HomeService,private alertCtrl:AlertController  ){
  this.images=this.imageService.images;
}
  ngOnInit() {
  }
  authenticate(email:string,password:string,role:string,firstName:string,lastName:string){
    this.isLoading=true;
    this.loadingCtrl.create({keyboardClose:true,message:'loadinng....'}).then(loadCtrl=>{
      loadCtrl.present();
      let authObs:Observable<any>;
      if(this.isLogin){
        authObs=this.authService.login(email,password,role);
      }
      else{
        authObs=this.authService.signup(email,password,role,firstName,lastName)
      }
      authObs.subscribe({next:(respData)=>{
        let User=respData;
        if(!this.isLogin){
          this.alertCtrl.create({
            header:'Verify Account',
            message:'Link has been sent to your email',
            buttons:[{text:'Okay',handler:()=>{
              this.alertCtrl.create({
                header:'Verification',
                message:'Did you Verified',
                buttons:[{text:'Yes',handler:()=>{
                  this.authService.verifyAccount().subscribe(resData=>{
                    User=Object.values(Object.values(resData)[1])[0]
                    if(User.emailVerified===true){

                      this.verifyRole(role)
                    }
                    else{
                      this.authService.deleteAccount(User.localId).subscribe();
                      this.alertCtrl.create({
                        header:'An error occured',
                        message:'Sign up Again and immediately verify your account by visiting link from your mail',
                        buttons:['Okay']
                      }).then(alertEl=>{
                        alertEl.present();
                      })
                      this.router.navigate(['/auth']);
                    }
                  })

                }},{text:'No',handler:()=>{
                  this.authService.deleteAccount(User.localId).subscribe();
                  this.router.navigate(['/auth'])
                  this.alertCtrl.create({header:'Sign up Again',
                  message:'To verify your account sign up again',
                  buttons:['Okay']
                }).then(alertEl=>{
                  alertEl.present();
                })
                }}]
              }).then(alertEl=>{
                alertEl.present();
              })
            }}]
          }).then(alertEl=>{
            alertEl.present();
          })
          loadCtrl.dismiss();
          this.isLoading=false;
        }
       else{
        loadCtrl.dismiss();
        this.isLoading=false;
        this.verifyRole(role)
       }


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
  const firstName=form.value.firstName;
  const lasttName=form.value.lastName;
this.authenticate(email,password,role,firstName,lasttName);
form.reset();
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

private verifyRole(role:string){
  if(role===this.authService.role){

    if(role=='employer'){
    this.router.navigateByUrl('/employer')
    }
    else{
      this.router.navigateByUrl('/employee')
    }
  }
  else{
    this.authService.logout();


    this.alertCtrl.create({header:'An error occurred',
  message:`Role not matched`,
buttons:['Okay']}).then(alertEl=>{
  alertEl.present();
})
  }
}

cancel() {
  this.modal.dismiss(null, 'cancel');
}
onForgetPassword(email:string){
this.authService.forgetPassword(email).subscribe(()=>{
  this.alertCtrl.create({header:'Rest Password',
  message:'Reset password mail has been sent',
buttons:['Okay']}).then(alertEl=>{
  alertEl.present();
})
})

}
}
