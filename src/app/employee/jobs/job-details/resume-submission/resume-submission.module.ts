import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumeSubmissionPageRoutingModule } from './resume-submission-routing.module';

import { ResumeSubmissionPage } from './resume-submission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeSubmissionPageRoutingModule
  ],
  declarations: [ResumeSubmissionPage]
})
export class ResumeSubmissionPageModule {}
