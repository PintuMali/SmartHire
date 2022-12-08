import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployerPageRoutingModule } from './employer-routing.module';

import { EmployerPage } from './employer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployerPageRoutingModule
  ],
  declarations: [EmployerPage]
})
export class EmployerPageModule {}
