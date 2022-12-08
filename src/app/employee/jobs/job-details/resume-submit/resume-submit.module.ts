import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumeSubmitPageRoutingModule } from './resume-submit-routing.module';

import { ResumeSubmitPage } from './resume-submit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeSubmitPageRoutingModule
  ],
  declarations: [ResumeSubmitPage]
})
export class ResumeSubmitPageModule {}
