import { Injectable } from "@angular/core";
import { Jobs } from "./job.model";

@Injectable(
  {providedIn:'root'}
)
export class JobService{
  private _jobs:Jobs[]=[
      new Jobs('j1','../../assets/images/featureJob.svg',{
        img1:'../../assets/images/loveToLearn.svg',
        img2: '../../assets/images/glassBall.svg',
        img3:'../../assets/images/dream.svg',
        img4: '../../assets/images/learn.svg'
      })
  ]
  constructor(){}
  get jobs(){
    return [...this._jobs];
  }
}
