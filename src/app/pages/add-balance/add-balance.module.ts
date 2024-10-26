import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBalancePageRoutingModule } from './add-balance-routing.module';

import { AddBalancePage } from './add-balance.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBalancePageRoutingModule,
    SharedModule
  ],
  declarations: [AddBalancePage]
})
export class AddBalancePageModule {}
