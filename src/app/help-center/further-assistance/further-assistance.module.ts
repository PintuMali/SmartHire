import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FurtherAssistancePageRoutingModule } from './further-assistance-routing.module';

import { FurtherAssistancePage } from './further-assistance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FurtherAssistancePageRoutingModule
  ],
  declarations: [FurtherAssistancePage]
})
export class FurtherAssistancePageModule {}
