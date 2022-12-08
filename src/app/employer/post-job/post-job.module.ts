import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostJobPageRoutingModule } from './post-job-routing.module';

import { PostJobPage } from './post-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostJobPageRoutingModule
  ],
  declarations: [PostJobPage]
})
export class PostJobPageModule {}
