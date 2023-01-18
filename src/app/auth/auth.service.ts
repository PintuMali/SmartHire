import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, concatMap, from, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import {Capacitor} from '@capacitor/core';
import {Preferences} from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
export interface AuthResponseData{
  kind:string,
  idToken:string,
  email:string,
  refreshToken:string,
  localId:string,
  expiresIn:string,
  registered?:boolean
}

interface userData{
  email:string,
  firstName:string,
  lastName:string,
  role:string,
  userId:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private _user= new  BehaviorSubject<User>(null);
  private _role:string;
  private activeLogoutTimer:any;
  private _roleId:string;


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
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`
    ,{email:email,password:password,returnSecureToken:true}
    ).pipe(tap(this.setUserData.bind(this)
    ),tap(data=>{
      return this.http.post(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`,{userId:data.localId,email:data.email,firstName:firstName,lastName:lastName,role:this._role}).subscribe(data=>{
        this._roleId=data['name'];

      });
    }
    ));
  }
  login(email:string,password:string,role:string){
    return this.http.get<{[key:string]:userData}>(`https://smarthire-1817a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json?orderBy="email"&equalTo="${email}"`).pipe(tap(userData=>{

         this._role=Object.values(userData)[0].role

       if(role!==this._role){
       return null;
       }

       }),concatMap(()=>{
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`
        ,{email:email,password:password,returnSecureToken:true
        }).pipe(tap(data=>{

        }),tap(this.setUserData.bind(this))
        );
       }));

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
}
