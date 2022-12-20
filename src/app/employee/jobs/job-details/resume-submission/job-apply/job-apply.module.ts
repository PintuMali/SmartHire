import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobApplyPageRoutingModule } from './job-apply-routing.module';

import { JobApplyPage } from './job-apply.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobApplyPageRoutingModule
  ],
  declarations: [JobApplyPage]
})
export class JobApplyPageModule {}
