import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookmarkedJobsPage } from './bookmarked-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: BookmarkedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarkedJobsPageRoutingModule {}
