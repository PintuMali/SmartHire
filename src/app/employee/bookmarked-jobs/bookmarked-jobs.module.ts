import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookmarkedJobsPageRoutingModule } from './bookmarked-jobs-routing.module';

import { BookmarkedJobsPage } from './bookmarked-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookmarkedJobsPageRoutingModule
  ],
  declarations: [BookmarkedJobsPage]
})
export class BookmarkedJobsPageModule {}
