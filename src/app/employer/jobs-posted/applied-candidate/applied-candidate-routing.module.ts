import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppliedCandidatePage } from './applied-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: AppliedCandidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppliedCandidatePageRoutingModule {}
