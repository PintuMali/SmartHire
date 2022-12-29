export class Jobs{
  constructor(public jobId:string,
    public companyName:string,
    public companyLogo:string,
    public jobProfile:string,
    public imgUrl:string,
    public childImgUrl:{img1:string,img2:string,img3:string,img4:string},
    public jobSalary:number,
    public jobDeadline:string,
    public jobDuration:string,
    public jobDescription:string,
    public jobSkills:string[],
    public jobExperience:string,
    public jobLocation:string,
    public jobType:string,
    public hasEnoughTime:boolean){}
}
