import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobDetailsPage } from './job-details.page';

const routes: Routes = [
  {
    path: '',
    component: JobDetailsPage
  },
  {
    path: 'resume-submit',
    loadChildren: () => import('./resume-submit/resume-submit.module').then( m => m.ResumeSubmitPageModule)
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
export class JobDetailsPageRoutingModule {}
