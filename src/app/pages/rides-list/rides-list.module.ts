import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidesListPageRoutingModule } from './rides-list-routing.module';

import { RidesListPage } from './rides-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidesListPageRoutingModule,
    SharedModule
  ],
  declarations: [RidesListPage]
})
export class RidesListPageModule {}
