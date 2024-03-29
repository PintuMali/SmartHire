
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Job } from '../../../job.model';
import { JobsService } from '../../../jobs.service';
import { Images } from 'src/app/app.model';
import { HomeService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-resume-submission',
  templateUrl: './resume-submission.page.html',
  styleUrls: ['./resume-submission.page.scss'],
})

export class ResumeSubmissionPage implements OnInit {
  private _currentJobId;
  private _userId:string
  private _fullname:string

  accuracy:number = 0;
  jobskill:string = '';
  job:Job;
  file:any='';
  isLoading=false;
  jobid:string;
  images:Images[];
  public progress = 0;
  fileaccepter = false;
  show = false;
  error = false;

  @ViewChild('fileInput', {static: false})
  myFileInput: ElementRef;




  constructor(private http:HttpClient,private authService:AuthService,private navCtrl:NavController,private jobService:JobsService, private alertCtrl:AlertController,private route: ActivatedRoute, private imageService:HomeService,private router:Router) {
    this.images=imageService.images;
  }


  ngOnInit() {
    this.authService.userDetails.subscribe(userDetail=>{
      this._userId=userDetail[0].userId;
       this._fullname=userDetail[0].firstName+ " "+userDetail[0].lastName
     })
    this.route.paramMap.subscribe(paramMap=>{
      if(!paramMap.has('jobId')){
        this.navCtrl.navigateBack('/employee/jobs/');
        return;
      }
      this.isLoading=true;
       this.jobService.getJob(paramMap.get('jobId'))
      .subscribe({next:job=>{
        this.jobid=paramMap.get('jobId')
        this.job=job
        this.isLoading=false;
      },error:error=>{
        this.alertCtrl.create({header:'An error occured!',message:'Could not load job',buttons:[{text:'Okay',handler:()=>{
          this.router.navigate(['/employee/jobs'])
        }}]}).then(alerEl=>{
          alerEl.present();
        })
      }});
    })
  }

  getFile(event: any){
    this.file = event.target.files[0];
    const fileName = this.file.name;
    if (fileName.endsWith('.docx') || fileName.endsWith('.pdf')) {
        this.fileaccepter = true;
    } else {
        alert('Invalid file type. Please select a docx or pdf file.');
    }
}


  test(){
    this.jobskill = JSON.stringify(this.job.jobSkills);
    //alert(typeof this.jobskill === 'string')
    let formData = new FormData();
    formData.set('jobdesc', this.job.jobDescription);
    formData.set('jobexp', this.job.jobExperience);
    formData.set('jobskills', this.jobskill);
    formData.set('file', this.file);

    if(this.fileaccepter==true) {
    this.http.post('http://furkan121.pythonanywhere.com/upload_file', formData).subscribe(
      (res: any) => {
        this.accuracy=res.Score;
        if(this.accuracy>30){
          this.show=true;
        }
        else{
          this.error=true;
        }
      });
    }
    else{

      this.alertCtrl.create({
        header:'Invalid file format',
        message:'Only pdf and docx files are supported',
        buttons:[{text:'Okay'}]
      }).then(alertEl=>{
        alertEl.present();
      })
    }

    setInterval(() => {
      if(this.progress<(this.accuracy/100)){
        this.progress += 0.01;
      }
    }, 20);
  }

  reset(){
    this.myFileInput.nativeElement.value = '';
    this.show = false;
    this.error = false;
  }

  async submit() {
    try {
      const token = await this.authService.token.pipe(take(1)).toPromise();
      const url = `https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/applied-jobs.json?orderBy="userId"&equalTo="${this._userId}"&auth=${token}`;
  
      let check = false; // Initialize the check variable to false
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data) {
            // Iterate over the results and check if there is an entry with the given jobId and userId
            for (const key in data) {
              if (data[key].jobId === this.jobid) {
                console.log("you cannot reapply");
                check = true;
                this.alertCtrl.create({
                  header:'Oops! ',
                  message:'You have already applied to this job',
                  buttons:[{
                    text:'Okay',
                    handler:() => {
                      this.router.navigate(['/employee']);
                    }
                  }]
                }).then(alertEl => {
                  alertEl.present();
                });
                break;
              }
            }
          }
  
          // Move the else statement outside the for loop
          if (check == false) {
            this.jobService.applyJobWithResume(this.jobid,this.file,this._fullname,this.accuracy).subscribe()
            this.alertCtrl.create({
              header:'Success',
              message:'Your application has been submitted. You may now browse different jobs.',
              cssClass: 'success-alert-message',
              buttons:[{text:'Okay',handler:()=>{
                this.router.navigate(['/employee']);
              }}]
            }).then(alertEl=>{
              alertEl.present();
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
  }
}
