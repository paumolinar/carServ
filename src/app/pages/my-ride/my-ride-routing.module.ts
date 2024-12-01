import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRidePage } from './my-ride.page';

const routes: Routes = [
  {
    path: '',
    component: MyRidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRidePageRoutingModule {}
