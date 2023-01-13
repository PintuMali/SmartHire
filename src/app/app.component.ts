import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Images } from './app.model';
import { HomeService } from './app.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  images:Images[];
  private authSub:Subscription;
  private previousAuthState=false;
  constructor(private homeService:HomeService,private authService:AuthService,private router:Router) {
    this.images=homeService.images;
  }
  onLogout(){
    this.authService.logout();

  }
  ngOnInit(): void {
    this.authSub=this.authService.userIsAuthenticated.subscribe(isAuth=>{
      if(!isAuth && this.previousAuthState!==isAuth){
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState=isAuth;
    });
  }
  ngOnDestroy(): void {
      if(this.authSub){
        this.authSub.unsubscribe();
      }
  }
}
