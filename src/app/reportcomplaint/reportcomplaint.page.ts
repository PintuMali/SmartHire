import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore/'; 
import { AuthService } from '../auth/auth.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-reportcomplaint',
  templateUrl: './reportcomplaint.page.html',
  styleUrls: ['./reportcomplaint.page.scss'],
})
export class ReportcomplaintPage implements OnInit {
  companyName: string;
  selectedDepartment: string;
  complaintDescription: string;
  userId : string;
  firstname: string;
  lastname: string;

  constructor(private alertCtrl:AlertController,public authService: AuthService,private firestore: AngularFirestore) {}

   submitComplaint() {

    if(this.companyName && this.selectedDepartment && this.complaintDescription){
      this.firestore.collection('complaints').add({
        userId:this.userId,
        firstname:this.firstname,
        lastname:this.lastname,
        companyName: this.companyName,
        department: this.selectedDepartment,
        description: this.complaintDescription,
        createdAt: new Date()
      }).then(() => {
        this.alertCtrl.create({
          header: 'Success',
          message: 'Your Complaint has been submitted. We will get back to you soon',
          cssClass: 'success-alert-message',
          buttons: [{text: 'Okay'}]
        }).then(alertEl => {
          alertEl.present();
        });
      })
      .catch((error) => {
        this.alertCtrl.create({
          header: 'Error',
          message: '`There was an error submitting your query: ${error.message}. Please try again later.',
          cssClass: 'error-alert-message',
          buttons: [{text: 'Okay'}]
        }).then(alertEl => {
          alertEl.present();
        });
      });
    }
    else{
      this.alertCtrl.create({
        header: 'Error',
        message: 'Please fill all the fields',
        cssClass: 'error-alert-message',
        buttons: [{text: 'Okay'}]
      }).then(alertEl => {
        alertEl.present();
      });
    }
   
  }


  ngOnInit() {
    this.authService.userDetail().subscribe((res:any) => {
      this.userId = res[Object.keys(res)[0]].userId;
      this.firstname = res[Object.keys(res)[0]].firstName;
      this.lastname = res[Object.keys(res)[0]].lastName;
      
  });
  }

}
