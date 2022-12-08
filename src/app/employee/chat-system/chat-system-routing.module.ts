import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatSystemPage } from './chat-system.page';

const routes: Routes = [
  {
    path: '',
    component: ChatSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatSystemPageRoutingModule {}
