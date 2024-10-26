import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBalancePage } from './add-balance.page';

const routes: Routes = [
  {
    path: '',
    component: AddBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBalancePageRoutingModule {}
