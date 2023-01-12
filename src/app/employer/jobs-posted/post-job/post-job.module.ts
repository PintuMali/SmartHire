import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostJobPageRoutingModule
  ],
  declarations: [PostJobPage]
})
export class PostJobPageModule {}
