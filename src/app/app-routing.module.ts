import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guards';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'forgot-password',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-ride',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/create-ride/create-ride.module').then(
        (m) => m.CreateRidePageModule
      ),
  },
  {
    path: 'rides-list',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/rides-list/rides-list.module').then(
        (m) => m.RidesListPageModule
      ),
  },
  {
    path: 'add-balance',
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./pages/add-balance/add-balance.module').then(
        (m) => m.AddBalancePageModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
