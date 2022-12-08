import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppliedCandidatePageRoutingModule } from './applied-candidate-routing.module';

import { AppliedCandidatePage } from './applied-candidate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppliedCandidatePageRoutingModule
  ],
  declarations: [AppliedCandidatePage]
})
export class AppliedCandidatePageModule {}
