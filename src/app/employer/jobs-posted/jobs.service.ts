import { Injectable } from "@angular/core";
import { Jobs } from "./jobs.model";

@Injectable({providedIn:'root'})
export class JobsService{
  private _jobs:Jobs[]=[
    new Jobs('j1','facebook','../../../assets/images/glassBall.svg','Front-End Developer','../../../assets/images/loveToLearn.svg',{img1:'../../../assets/images/dream.svg',img2:'../../../assets/images/dream.svg',img3:'../../../assets/images/dream.svg',img4:'../../../assets/images/dream.svg'},20000,'2022-12-30','3 months','shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3 months','mumbai','work from home',true),
    new Jobs('j2','facebook','../../../assets/images/glassBall.svg','Front-End Developer','../../../assets/images/loveToLearn.svg',{img1:'../../../assets/images/dream.svg',img2:'../../../assets/images/dream.svg',img3:'../../../assets/images/dream.svg',img4:'../../../assets/images/dream.svg'},20000,'2022-12-30','3 months','shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3 months','mumbai','work from home',true),
    new Jobs('j3','facebook','../../../assets/images/glassBall.svg','Front-End Developer','../../../assets/images/loveToLearn.svg',{img1:'../../../assets/images/dream.svg',img2:'../../../assets/images/dream.svg',img3:'../../../assets/images/dream.svg',img4:'../../../assets/images/dream.svg'},20000,'2022-12-30','3 months','shuld know how to create structure of web page and networking knowledge required',['javascript','react','mongodb'],'2-3 months','mumbai','work from home',true)
  ];
  constructor(){}
  get jobs(){
    return [...this._jobs]
  }
}

