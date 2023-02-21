import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindjobsPageRoutingModule } from './findjobs-routing.module';

import { FindjobsPage } from './findjobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindjobsPageRoutingModule
  ],
  declarations: [FindjobsPage]
})
export class FindjobsPageModule {}
