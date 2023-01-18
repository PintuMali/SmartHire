import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostJobPageRoutingModule,
    SharedModule
  ],
  declarations: [PostJobPage]
})
export class PostJobPageModule {}
