import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobsPostedPageRoutingModule } from './jobs-posted-routing.module';

import { JobsPostedPage } from './jobs-posted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobsPostedPageRoutingModule
  ],
  declarations: [JobsPostedPage]
})
export class JobsPostedPageModule {}
