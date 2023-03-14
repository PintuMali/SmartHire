import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore/'; 
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-further-assistance',
  templateUrl: './further-assistance.page.html',
  styleUrls: ['./further-assistance.page.scss'],
})
export class FurtherAssistancePage implements OnInit {
  QueryDescription: string;
  userId : string;
  firstname: string;
  lastname: string;
  selectedDepartment:string;

  constructor(private alertCtrl:AlertController,public authService: AuthService,private firestore: AngularFirestore) {}

   submitComplaint() {
      this.firestore.collection('Queries').add({
      userId:this.userId,
      firstname:this.firstname,
      lastname:this.lastname,
      subject: this.selectedDepartment,
      description: this.QueryDescription,
      createdAt: new Date()
    }).then(() => {
      this.alertCtrl.create({
        header: 'Success',
        message: 'Your Query has been submitted. We will get back to you soon',
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



  ngOnInit() {
    this.authService.userDetail().subscribe((res:any) => {
      this.userId = res[Object.keys(res)[0]].userId;
      this.firstname = res[Object.keys(res)[0]].firstName;
      this.lastname = res[Object.keys(res)[0]].lastName;
      
  });
  }

}
