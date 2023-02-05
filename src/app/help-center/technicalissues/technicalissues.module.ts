import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechnicalissuesPageRoutingModule } from './technicalissues-routing.module';

import { TechnicalissuesPage } from './technicalissues.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechnicalissuesPageRoutingModule
  ],
  declarations: [TechnicalissuesPage]
})
export class TechnicalissuesPageModule {}
