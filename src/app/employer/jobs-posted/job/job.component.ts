import { Component, Input, OnInit } from '@angular/core';
import { Jobs } from '../jobs.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
@Input() job:Jobs;
  constructor() { }

  ngOnInit() {}
  getDummyDate(){
    return new Date;
  }

}
