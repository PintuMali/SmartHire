import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatSystemPageRoutingModule } from './chat-system-routing.module';

import { ChatSystemPage } from './chat-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatSystemPageRoutingModule
  ],
  declarations: [ChatSystemPage]
})
export class ChatSystemPageModule {}
