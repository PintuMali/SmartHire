import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.page.html',
  styleUrls: ['./employer.page.scss'],
})
export class EmployerPage implements OnInit {
  firstname: string;
  lastname: string;

  constructor(public authService: AuthService){
  }

  ngOnInit() {
    this.authService.userDetail().subscribe((res:any) => {

      this.firstname = res[Object.keys(res)[0]].firstName;
      this.lastname = res[Object.keys(res)[0]].lastName;
  });
  }
  onLogout(){
    this.authService.logout();

  }
  
}
