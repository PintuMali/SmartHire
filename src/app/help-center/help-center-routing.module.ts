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
  },
  {
    path: 'findjobs',
    loadChildren: () => import('./findjobs/findjobs.module').then( m => m.FindjobsPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),canLoad:[AuthGuard]
  },
  {
    path: 'further-assistance',
    loadChildren: () => import('./further-assistance/further-assistance.module').then( m => m.FurtherAssistancePageModule),canLoad:[AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpCenterPageRoutingModule {}
