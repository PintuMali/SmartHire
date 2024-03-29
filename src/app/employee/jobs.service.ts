import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { title } from "process";
import { BehaviorSubject, concatMap, from, map, of, switchMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Job } from "./job.model";
interface JobData{
companyLogo: string
companyName: string;
jobDeadline: Date
jobDescription: string
jobExperience: string
jobLocation: string
jobProfile: string
jobSalary: number
jobSkills: []
jobType: string
userId: string
}

// [new Job('j1','facebook','../../../assets/images/glassBall.svg','Front-End Developer',20000,new Date('2023-01-15'),'shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3','mumbai','work from home',this.authService.userId,['../../../assets/images/glassBall.svg','../../../assets/images/glassBall.svg','../../../assets/images/glassBall.svg','../../../assets/images/glassBall.svg','../../../assets/images/glassBall.svg']),
// new Job('j2','facebook','../../../assets/images/glassBall.svg','Front-End Developer',20000,new Date('2023-01-14'),'shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3','mumbai','work from home',this.authService.userId,[]),
// new Job('j3','facebook','../../../assets/images/glassBall.svg','Front-End Developer',20000,new Date('2023-12-30'),'shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3','mumbai','work from home',this.authService.userId,[])
// ]
@Injectable({providedIn:'root'})
export class JobsService{
  private _jobs= new BehaviorSubject<Job[]>([]);
  private _basePath='/images'
  filter:string;
  constructor(private authService:AuthService,private http:HttpClient,private db:AngularFireDatabase,private storage:AngularFireStorage){}
  fetchJobs(){
    return this.authService.token.pipe(switchMap(token=>{
      return this.http.get<{[key:string]:JobData}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs.json?auth=${token}`)
    }),
    map(respData=>{
      const jobs=[];
      for(const key in respData){
        if(respData.hasOwnProperty(key)){
          jobs.push(new Job(key,respData[key].companyName,respData[key].companyLogo,respData[key].jobProfile,respData[key].jobSalary,new Date(respData[key].jobDeadline),respData[key].jobDescription,respData[key].jobSkills,respData[key].jobExperience,respData[key].jobLocation,respData[key].jobType,respData[key].userId,true))
        }
      }
      return jobs;
    }),tap(jobs=>{
      this._jobs.next(jobs);
    })
    );
  }

  uploadImage(image:File){
    const filePath=`${this._basePath}/${image['name']}`
    const storageRef=this.storage.ref(filePath)
    const uploadtask= from(this.storage.upload(filePath,image));
    return this.authService.token.pipe(switchMap(token=>{
      return uploadtask.pipe(concatMap(()=>{
        return storageRef.getDownloadURL();
      }));
    }));
  }

  uploadDocx(docx: File){
    const filePath = `resume/${docx['name']}`;
    const storageRef = this.storage.ref(filePath);
    const uploadtask= from(this.storage.upload(filePath, docx));
    return this.authService.token.pipe(switchMap(token=>{
      return uploadtask.pipe(concatMap(()=>{
        return storageRef.getDownloadURL();
      }));
    }));
  }

  fetchEmployerJobs(){
    let fetchedUserId:string
    return this.authService.userId.pipe(take(1),switchMap(userId=>{
      fetchedUserId=userId;

      return this.authService.token;
    }),take(1),switchMap(token=>{
      if(!fetchedUserId){
        throw new Error('User not found');
      }
      return this.http.get<{[key:string]:JobData}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`)
    }),
    map(respData=>{
      const jobs=[];
      for(const key in respData){
        if(respData.hasOwnProperty(key)){
          jobs.push(new Job(key,respData[key].companyName,respData[key].companyLogo,respData[key].jobProfile,respData[key].jobSalary,new Date(respData[key].jobDeadline),respData[key].jobDescription,respData[key].jobSkills,respData[key].jobExperience,respData[key].jobLocation,respData[key].jobType,respData[key].userId,true))
        }
      }
      return jobs;
    }),tap(jobs=>{
      this._jobs.next(jobs);
    }));
  }

  get jobs(){
    return this._jobs.asObservable();
  }
  getJob(jobId:string){
    return this.authService.token.pipe(take(1),switchMap(token=>{
      return this.http.get<JobData>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs/${jobId}.json?auth=${token}`)
    }),
      map(jobData=>{
        return new Job(jobId,jobData.companyName,jobData.companyLogo,jobData.jobProfile,jobData.jobSalary,new Date(jobData.jobDeadline),jobData.jobDescription,jobData.jobSkills,jobData.jobExperience,jobData.jobLocation,jobData.jobType,jobData.userId,true)
      })
    );
  }
  addJob(companyName:string,companyLogo:string,jobProfile:string,jobSalary:number,jobDeadline:Date,jobDescription:string,jobSkills:string[],jobExperience:string,jobLocation:string,jobType:string,featureImage:[]=[]){
    let generatedJobId:string;
    let newJob:Job;
    let fetchedUserId:string;
    return this.authService.userId.pipe(take(1),switchMap(userId=>{
      fetchedUserId=userId;
      return this.authService.token
    }),take(1),switchMap(token=>{
      if(!fetchedUserId){
        throw new Error('No user id found');
      }
       newJob=new Job(Math.random().toString(),companyName,companyLogo,jobProfile,jobSalary,jobDeadline,jobDescription,jobSkills,jobExperience,jobLocation,jobType,fetchedUserId,true,featureImage);
      return this.http.post<{name:string}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs.json?auth=${token}`,{...newJob, jobId:null});
    }),switchMap(respData=>{
      generatedJobId=respData.name;
      return this.jobs;
    }),take(1),
    tap(jobs=>{
          newJob.jobId=generatedJobId;
          this._jobs.next(jobs.concat(newJob));
      }));

  }
  updateJob(jobId:string,salary:number,deadline:Date,jobDescription:string,jobSkills:[],jobExperience:string){
    let updatedJobs:Job[];
    let fetchedToken:string
    return this.authService.token.pipe(take(1),switchMap(token=>{
      fetchedToken=token;
      return this.jobs;
    }),take(1),switchMap(jobs=>{
      if(!jobs || jobs.length<=0){
        return this.fetchJobs();
      }
      else{
        return of(jobs);
      }
    }
    ),switchMap(jobs=>{
      const updatedJobIndex=jobs.findIndex(jb=>jb.jobId===jobId);
      updatedJobs=[...jobs]
      const oldJob=updatedJobs[updatedJobIndex];
      updatedJobs[updatedJobIndex]=new Job(oldJob.jobId,oldJob.companyName,oldJob.companyLogo,oldJob.jobProfile,salary,deadline,jobDescription,jobSkills,jobExperience,oldJob.jobLocation,oldJob.jobType,oldJob.userId,true,oldJob.featureImage);
      return this.http.put(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs/${jobId}.json?auth=${fetchedToken}`,
      {...updatedJobs[updatedJobIndex], jobId:null}
      );
    }),tap(()=>{
      this._jobs.next(updatedJobs);

    }));
  }
  deleteJob(jobId:string){
    return this.authService.token.pipe(take(1),switchMap(token=>{
      return this.http.delete(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/posted-jobs/${jobId}.json?auth=${token}`)
    }),switchMap(()=>{
      return this.jobs;
    }),take(1),tap(jobs=>{
      let imgPath;
      let job=jobs.filter(jb=>jb.jobId===jobId);
      imgPath=job[0].companyLogo;

      this.deleteImage(imgPath)
      this._jobs.next(jobs.filter(jb=>jb.jobId!==jobId));

    }));
  }

  deleteImage(imgUrl:string){
    this.storage.refFromURL(imgUrl).delete();
  }

  applyJobWithResume(jobId: string, docx: File, fullname: string, score: number) {
    return this.authService.token.pipe(
      switchMap(token => {
        const filePath = `resume/${docx['name']}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = from(this.storage.upload(filePath, docx));
        let fetchedUserId: string;
        return this.authService.userId.pipe(
          take(1),
          switchMap(userId => {
            fetchedUserId = userId;
            if (!fetchedUserId) {
              throw new Error('No user id found');
            }
            return uploadTask.pipe(
              concatMap(() => {
                return storageRef.getDownloadURL().pipe(
                  switchMap(downloadUrl => {
                    const data = { jobId, jobResumeUrl: downloadUrl, fullname, score , userId: fetchedUserId};
                    return this.http.post<{ name: string }>(
                      `https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/applied-jobs.json?auth=${token}`,data);
                  })
                );
              })
            );
          })
        );
      })
    );
  }
  
  
  
}

