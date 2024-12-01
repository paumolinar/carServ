import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRidePageRoutingModule } from './my-ride-routing.module';

import { MyRidePage } from './my-ride.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRidePageRoutingModule,
    SharedModule
  ],
  declarations: [MyRidePage]
})
export class MyRidePageModule {}
