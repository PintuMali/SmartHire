import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeTestPage } from './resume-test.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeTestPageRoutingModule {}
