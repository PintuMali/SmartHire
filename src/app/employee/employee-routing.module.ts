import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeePage
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'search-bar',
    loadChildren: () => import('./search-bar/search-bar.module').then( m => m.SearchBarPageModule)
  },
  {
    path: 'filter/:ciId',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: ':filter/caId',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'bookmarked-jobs',
    loadChildren: () => import('./bookmarked-jobs/bookmarked-jobs.module').then( m => m.BookmarkedJobsPageModule)
  },
  {
    path: 'chat-system',
    loadChildren: () => import('./chat-system/chat-system.module').then( m => m.ChatSystemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
