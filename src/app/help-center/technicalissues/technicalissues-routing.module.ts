import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicalissuesPage } from './technicalissues.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicalissuesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicalissuesPageRoutingModule {}
