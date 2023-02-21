import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindjobsPage } from './findjobs.page';

const routes: Routes = [
  {
    path: '',
    component: FindjobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindjobsPageRoutingModule {}
