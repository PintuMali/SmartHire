import { Injectable } from "@angular/core";
import { Jobs } from "./job.model";

@Injectable(
  {providedIn:'root'}
)
export class JobService{
  private _jobs:Jobs[]=[
      new Jobs('j1','FrontEnd Developer','Facebook','../../assets/images/featureJob.svg',{
        img1:'../../assets/images/loveToLearn.svg',
        img2: '../../assets/images/glassBall.svg',
        img3:'../../assets/images/dream.svg',
        img4: '../../assets/images/learn.svg'
      },'mumbai',6000,3,'2022-12-27',true),
      new Jobs('j2','BackEnd Developer','Google','../../assets/images/glassBall.svg',{
        img1:'../../assets/images/loveToLearn.svg',
        img2: '../../assets/images/glassBall.svg',
        img3:'../../assets/images/dream.svg',
        img4: '../../assets/images/learn.svg'
      },'mumbai',6000,3,'2023-01-05',true)
  ]
  constructor(){}
  get jobs(){
    return [...this._jobs];
  }
}
