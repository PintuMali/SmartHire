import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobsPostedPage } from './jobs-posted.page';

const routes: Routes = [
  {
    path: '',
    component: JobsPostedPage
  },
  {
    path: 'applied-candidate',
    loadChildren: () => import('./applied-candidate/applied-candidate.module').then( m => m.AppliedCandidatePageModule)
  },
  {
    path: 'edit-job/:jobId',
    loadChildren: () => import('./edit-job/edit-job.module').then( m => m.EditJobPageModule)
  },
  {
    path: 'post-job',
    loadChildren: () => import('./post-job/post-job.module').then( m => m.PostJobPageModule)
  },
  {
    path: 'applied-candidate/:jobId',
    loadChildren: () => import('./applied-candidate/applied-candidate.module').then( m => m.AppliedCandidatePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsPostedPageRoutingModule {}
