import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { HelpCenterPage } from './help-center.page';

const routes: Routes = [
  {
    path: '',
    component: HelpCenterPage
  },
  
  {
    path: 'technicalissues',
    loadChildren: () => import('./technicalissues/technicalissues.module').then( m => m.TechnicalissuesPageModule),canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpCenterPageRoutingModule {}
