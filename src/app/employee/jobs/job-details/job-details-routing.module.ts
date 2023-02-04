import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

import { JobDetailsPage } from './job-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailsPage
  },
  {
    path: 'resume-submission',
    loadChildren: () => import('./resume-submission/resume-submission.module').then( m => m.ResumeSubmissionPageModule),canLoad:[AuthGuard]
  },
  {
    path: ':jobId/resume-submission',
    loadChildren: () => import('./resume-submission/resume-submission.module').then( m => m.ResumeSubmissionPageModule),canLoad:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobDetailsPageRoutingModule {}
