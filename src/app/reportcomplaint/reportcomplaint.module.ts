import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportcomplaintPageRoutingModule } from './reportcomplaint-routing.module';

import { ReportcomplaintPage } from './reportcomplaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportcomplaintPageRoutingModule
  ],
  declarations: [ReportcomplaintPage]
})
export class ReportcomplaintPageModule {}
