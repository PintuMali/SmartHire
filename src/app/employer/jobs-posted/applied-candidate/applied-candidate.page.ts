import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BehaviorSubject, concatMap, from, map, switchMap, take, tap, Observable} from 'rxjs';
import { JobsService } from 'src/app/employee/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';


interface JobData{
  jobId:string,
  jobResumeUrl:string,
  fullname:string,
  score:string,
  }

@Component({
  selector: 'app-applied-candidate',
  templateUrl: './applied-candidate.page.html',
  styleUrls: ['./applied-candidate.page.scss'],
})


export class AppliedCandidatePage implements OnInit {

  jobs: JobData[];
  constructor(private route: ActivatedRoute,private http : HttpClient, private authService: AuthService,private jobService:JobsService) { }

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('jobId');
    this.authService.token.pipe(
      switchMap(token => {
        return this.http.get<{[key:string]:JobData}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/applied-jobs.json?orderBy="jobId"&equalTo="${jobId}"&auth=${token}`);
      })
    ).subscribe(
      (response) => {
        this.jobs = Object.keys(response).map(key => ({
          id: key,
          fullname: response[key].fullname,
          jobId: response[key].jobId,
          jobResumeUrl: response[key].jobResumeUrl,
          score: response[key].score
        }));
        console.log(this.jobs);
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
    
  }


