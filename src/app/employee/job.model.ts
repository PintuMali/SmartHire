export class Job{
  constructor(public jobId:string,
    public companyName:string,
    public companyLogo:string,
    public jobProfile:string,
    public jobSalary:number,
    public jobDeadline:Date,
    public jobDescription:string,
    public jobSkills:string[],
    public jobExperience:string,
    public jobLocation:string,
    public jobType:string,
    public userId:string,
    public featureImage?:string[],
   ){}
}
