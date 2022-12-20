export class Jobs{
  constructor(public jobId:string,public jobTitle:string,public company:string,public imgUrl:string,public childImgUrl:{img1:string,img2:string,img3:string,img4:string},public location:string,public salary:number,public duration:number,public applybefore:string,public hasEnoughTime:boolean){}
}
