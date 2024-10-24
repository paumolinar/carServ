import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidesListPage } from './rides-list.page';

const routes: Routes = [
  {
    path: '',
    component: RidesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidesListPageRoutingModule {}
