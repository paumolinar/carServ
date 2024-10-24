import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidesListPageRoutingModule } from './rides-list-routing.module';

import { RidesListPage } from './rides-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidesListPageRoutingModule
  ],
  declarations: [RidesListPage]
})
export class RidesListPageModule {}
