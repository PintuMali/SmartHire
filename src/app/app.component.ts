import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subscription, take, tap } from 'rxjs';
import { Images } from './app.model';
import { HomeService } from './app.service';
import { AuthService } from './auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  images:Images[];
  private authSub:Subscription;
  private previousAuthState=false;
  private userDetailSub:Subscription;
  isModalOpen = false;
  isModalOpen2=false;

  firstname: string;
  lastname: string;
  email: string;

  constructor(private homeService:HomeService,private authService:AuthService,private router:Router,private alertController:AlertController) {
    this.images=homeService.images;
  }
  onLogout(){
    this.alertController.create({
      header:'Logout',
      message:'Are you Sure ?',
      buttons:[{text:'Yes',handler:()=>{
        this.authService.logout();
      }},{text:'No'}]
    }).then(alertEl=>{
      alertEl.present()
    })


  }

  onSettings(isOpen:boolean){
    this.isModalOpen = isOpen;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    this.authService.changePassword(form.value.newPassword).subscribe(response=>{
      this.alertController.create({
        header:'Succesful',message:'Your password has been succesfully changed',buttons:[{text:'Okay',handler:()=>{
          this.onChangePassword(false);
          this.onSettings(false);
          this.authService.logout();
          this.alertController.create({header:'Login again',message:'Login again with new password',buttons:['Okay']})
          .then(alertEl=>{
            alertEl.present();
          })
        }}]
      }).then(alertEl=>{
        alertEl.present();
      });

    });
  }

  onDelete(){
    let userId:string;
     this.authService.userId.subscribe((UserId=>{
      userId=UserId
    }));
this.alertController.create({
  header:'Delete Account',
  message:'Are you really want to delete account?',
  buttons:[{text:'Yes',handler:()=>{

    this.authService.deleteAccount(userId).subscribe(()=>{
      this.onSettings(false);
      this.authService.logout();

    });


  }},{text:'No'}]
}).then(alertEl=>{
  alertEl.present();
})
  }

  onChangePassword(isOpen:boolean){
    this.isModalOpen2 = isOpen;
  }


  ngOnInit(): void {
    this.authSub=this.authService.userIsAuthenticated.subscribe(isAuth=>{
      if(!isAuth && this.previousAuthState!==isAuth){
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState=isAuth;
    });

this.authService.userId.subscribe(userId=>{
  if(userId){
    this.authService.userDetail().subscribe();
  }
})

    this.userDetailSub=this.authService.userDetails.subscribe((res:any) => {
      const userDetail=res[Object.keys(res)[0]]
      if(userDetail){
      this.email = userDetail.email;
      this.firstname = userDetail.firstName;
      this.lastname = userDetail.lastName;
      }
  });

  }
  ngOnDestroy(): void {
      if(this.authSub){
        this.authSub.unsubscribe();
      }
      if(this.userDetailSub){
        this.userDetailSub.unsubscribe();
      }
  }
}
