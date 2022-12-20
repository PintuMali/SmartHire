import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeSubmissionPage } from './resume-submission.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeSubmissionPage
  },
  {
    path: 'job-apply',
    loadChildren: () => import('./job-apply/job-apply.module').then( m => m.JobApplyPageModule)
  },
  {
    path: 'resume-test',
    loadChildren: () => import('./resume-test/resume-test.module').then( m => m.ResumeTestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeSubmissionPageRoutingModule {}
