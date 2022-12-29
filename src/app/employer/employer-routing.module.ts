import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerPage } from './employer.page';

const routes: Routes = [
  {
    path: '',
    component: EmployerPage
  },
  {
    path: 'jobs-posted',
    loadChildren: () => import('./jobs-posted/jobs-posted.module').then( m => m.JobsPostedPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerPageRoutingModule {}
