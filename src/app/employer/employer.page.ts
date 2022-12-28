import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Jobs } from './jobs-posted/jobs.model';
import { JobsService } from './jobs-posted/jobs.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.page.html',
  styleUrls: ['./employer.page.scss'],
})
export class EmployerPage implements OnInit {


  ngOnInit() {
  }

}
