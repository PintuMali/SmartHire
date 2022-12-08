import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestResultPage } from './test-result.page';

const routes: Routes = [
  {
    path: '',
    component: TestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestResultPageRoutingModule {}
