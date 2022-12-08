import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeTestPage } from './resume-test.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeTestPage
  },
  {
    path: 'test-result',
    loadChildren: () => import('./test-result/test-result.module').then( m => m.TestResultPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeTestPageRoutingModule {}
