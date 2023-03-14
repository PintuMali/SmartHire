import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FurtherAssistancePage } from './further-assistance.page';

const routes: Routes = [
  {
    path: '',
    component: FurtherAssistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FurtherAssistancePageRoutingModule {}
