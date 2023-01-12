import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobApplyPage } from './job-apply.page';

const routes: Routes = [
  {
    path: '',
    component: JobApplyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobApplyPageRoutingModule {}
