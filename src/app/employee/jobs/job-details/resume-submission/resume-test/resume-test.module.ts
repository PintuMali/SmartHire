import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumeTestPageRoutingModule } from './resume-test-routing.module';

import { ResumeTestPage } from './resume-test.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeTestPageRoutingModule
  ],
  declarations: [ResumeTestPage]
})
export class ResumeTestPageModule {}
