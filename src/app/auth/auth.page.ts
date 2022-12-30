import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth'
import { ActionSheetController } from '@ionic/angular';
import { Images } from '../app.model';
import { HomeService } from '../app.service';

import { ToastrService } from 'ngx-toastr';
 

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  images:Images[];
  isLoading = false;
  isLogin = false;
  defaultSelection: string = 'Employee';
  constructor(private fireauth: AngularFireAuth, private authService: AuthService, private router: Router, private loadingCtrl: LoadingController, private firestore: AngularFirestore,
    private actionSheetCtrl: ActionSheetController,
    private imageService:HomeService,
    private toastr: ToastrService) {
    this.images=this.imageService.images;
  }
  ngOnInit() {
  }
  onLogin() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'loading....' }).then(loadCtrl => {
      loadCtrl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadCtrl.dismiss();
      }, 1500)
    })
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role;

    if (this.isLogin) {
      this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
        this.authService.login()
        if (role == 'employee') {
          this.toastr.success("Login successful");
          this.router.navigate(['/employee']);
        }
        if (role == 'employer') {
          this.toastr.success("Login successful");
          this.router.navigate(['/employer']);
        }
      }).catch(err => {
        this.toastr.error("You have entered wrong credentials");
      })
    }

    else if (!this.isLogin) {
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      this.fireauth.createUserWithEmailAndPassword(email, password).then(data => {


        this.firestore.collection(role).doc(data.user.uid).set({
          'userId': data.user.uid,
          'name': firstName+" "+lastName,
          'email': email,
          'password': password,
        })
        this.authService.login();
        if(role=='employee'){
          this.router.navigate(['/employee']);
        }
        else if(role=='employer')
        {
          this.router.navigate(['/employer']);
        }

      }, err => {
        this.toastr.error("There is an error signing up. Please try again");
      })
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'SELECT YOUR ROLE',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Employee',
          handler: () => {
            return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(data => {

              this.firestore.collection('employee').doc(data.user?.uid).set({
                'userId': data.user?.uid,
                'name': data.user?.displayName,
                'email': data.user?.email,
                'method': "SigninwithGoogleAuth"
              })

              this.toastr.success("Successfully signed in with Google");
              this.router.navigate(['/employee']);
              localStorage.setItem('token', JSON.stringify(data.user?.uid));
              this.authService.login()

            }, err => {
              this.toastr.error("Popup closed");
            })

          },
        },
        {
          text: 'Employer',
          handler: () => {
            return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(data => {

              this.firestore.collection('employer').doc(data.user?.uid).set({
                'userId': data.user?.uid,
                'name': data.user?.displayName,
                'email': data.user?.email,
                'method': "SigninwithGoogleAuth"
              })

              this.toastr.success("Successfully signed in with Google");

              this.router.navigate(['/employer']);
              localStorage.setItem('token', JSON.stringify(data.user?.uid));
              this.authService.login()

            }, err => {
              this.toastr.error("Popup closed");
            })

          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    actionSheet.present();
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
