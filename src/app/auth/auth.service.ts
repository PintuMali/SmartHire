import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, switchMap, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import {Capacitor} from '@capacitor/core';
import {Preferences} from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { UserDetail } from './userDetail.model';

export interface AuthResponseData{
  kind:string,
  idToken:string,
  email:string,
  refreshToken:string,
  localId:string,
  expiresIn:string,
  registered?:boolean
}

export interface EmailVerifySendResponse{
  email:string,
  kind:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user= new  BehaviorSubject<User>(null);
  private _userDetail =new BehaviorSubject<UserDetail[]>([]);
  private _firstName:string;
  private _lastName:string;
  private _email:string;
  private _role:string=undefined;
  private activeLogoutTimer:any;
  private _roleId:string;

  get userDetails(){
    return this._userDetail.asObservable().pipe(tap(user=>{
      console.log(user);

    }));
  }
  get userIsAuthenticated(){
    return this._user.asObservable().pipe(map(user=>{
      if(user){

        return !!user.token
      }
      else{
        return false;
      }
    }
    ));
  }

  get role(){
    return this._role
  }

  get firstName(){
    return this ._firstName;
  }
  get lastName(){
    return this ._lastName;
  }
  get email(){
    return this ._email;
  }

  get userId(){
    return this._user.asObservable().pipe(map(user=>{
      if(user){
      return  user.id
      }
      else{
        return null;
      }
    }))
  }
get token(){
  return this._user.asObservable().pipe(map(user=>{
    if(user){
    return  user.token
    }
    else{
      return null;
    }
  }))
}

  constructor(private http:HttpClient,private alertCtrl:AlertController) { }
  autoLogin(){
    return from(Preferences.get({key:'authData'})).pipe(map(storedData=>{
      if(!storedData || !storedData.value){
        return null;
      }
      const parsedData=JSON.parse(storedData.value)as {token:string,tokenExpirationDate:string,userId:string,role:string,email:string};
      const expirationTime=new Date(parsedData.tokenExpirationDate);
      if(expirationTime<=new Date()){
        return null;
      }
      const user =new User(parsedData.userId,parsedData.role,parsedData.email,parsedData.token,expirationTime);
      return user;
    }),tap(user=>{
      if(user){
        this._user.next(user);
        this.autoLogout(user.tokenDuration);
      }
    }),map(user=>{
      return !!user;
    }));
  }
  signup(email:string,password:string,role:string,firstName:string,lastName:string){
    this._role=role;
    let fetchedToken;
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`
    ,{email:email,password:password,returnSecureToken:true}
    ).pipe(tap(this.setUserData.bind(this)
    ),tap(data=>{
      return this.http.post(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?auth=${data.idToken}`,{userId:data.localId,email:data.email,firstName:firstName,lastName:lastName,role:this._role}).subscribe(data=>{
        this._roleId=data['name'];

      });
    }
    ),tap(respData=>{

      fetchedToken=respData.idToken;

     return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebase.apiKey}`,{requestType:"VERIFY_EMAIL",idToken:fetchedToken}).subscribe();
    }));
  }
  login(email:string,password:string,role:string){

    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`
    ,{email:email,password:password,returnSecureToken:true
    }).pipe(tap(this.setUserData.bind(this)),concatMap(userData=>{

      return this.http.get<{[key:string]:UserDetail}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="userId"&equalTo="${userData.localId}"&auth=${userData.idToken}`).pipe(tap(user=>{

      this._role=Object.values(user)[0].role
      this._firstName=Object.values(user)[0].firstName
      this._lastName=Object.values(user)[0].lastName
      this._email=Object.values(user)[0].email


    if(role!==this._role){
    return null;
    }

    }))
    })
    );
;

  }
  logout(){
    this._user.next(null);
    Preferences.remove({key:'authData'});
  }

  private autoLogout(duration:number){
    if(this.activeLogoutTimer){
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer=setTimeout(()=>{
      this.logout();
      this.alertCtrl.create({
        header:'Session expired!',
        message:'Login again',
        buttons:['Okay']
      }).then(alerEl=>{
        alerEl.present();
      })

    },duration)
  }
    ngOnDestroy(): void {
    if(this.activeLogoutTimer){
      clearTimeout(this.activeLogoutTimer);
    }
  }

 deleteAccount(userId:string){
  let fetchedToken;
  return this.token.pipe(take(1),switchMap((token)=>{
     fetchedToken=token;
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${environment.firebase.apiKey}`,{idToken:fetchedToken})
  }),switchMap(()=>{
    return this.http.get(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="userId"&equalTo="${userId}"&auth=${fetchedToken}`);
  }),switchMap(respData=>{
    return this.http.delete(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users/${Object.keys(respData)[0]}.json?auth=${fetchedToken}`)
    }))
}

verifyAccount(){
  return this.token.pipe(take(1),switchMap(token=>{
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.firebase.apiKey}`,{idToken:token})
  }))

}

forgetPassword(email:string){
  return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${environment.firebase.apiKey}`,{"requestType":"PASSWORD_RESET","email":email});
}
  private setUserData(userData:AuthResponseData){

    const expirationTime=new Date(new Date().getTime()+(+userData.expiresIn*1000));
    const user=new User(userData.localId,this._role,userData.email,userData.idToken,expirationTime)
    this._user.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(userData.localId,this._role,userData.idToken,expirationTime.toISOString(),userData.email)

}
private storeAuthData(userId:string,role:string,token:string,tokenExpirationDate:string,email:string){
  const data=JSON.stringify({
    userId:userId,role:role,token:token,tokenExpirationDate:tokenExpirationDate,email:email
  });
  Preferences.set({key:'authData',value:data})

}

userDetail(){
  let fetchedUserId;
  return this.userId.pipe(switchMap(userId=>{
    fetchedUserId=userId;
    return this.token
  }),switchMap(token=>{
    return this.http.get<{[key:string]:UserDetail}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`).pipe(map((user)=>{
      const userDetail=[];
      for(const key in user){
        userDetail.push(new UserDetail(user[key].email,user[key].firstName,user[key].lastName,user[key].role,user[key].userId))
      }
      return userDetail;
    }),tap(userDetail=>{
      this._userDetail.next(userDetail)
    }));
  }))}
}
