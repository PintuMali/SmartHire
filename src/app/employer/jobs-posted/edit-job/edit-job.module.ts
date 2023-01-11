import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditJobPageRoutingModule } from './edit-job-routing.module';

import { EditJobPage } from './edit-job.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditJobPageRoutingModule
  ],
  declarations: [EditJobPage]
})
export class EditJobPageModule {}
