export class User{
  constructor(public id:string,public email:string,private _token:string,private tokenExxpirationDate: Date){}

  get token(){
    if(!this.tokenExxpirationDate||this.tokenExxpirationDate<= new Date()){
      return null
    }
    return this._token
  }
}
