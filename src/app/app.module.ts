import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';

export function initApp(storageService: StorageService) {
  return () => storageService.init();
}

export function routeReuseStrategy() {
  return { provide: RouteReuseStrategy, useClass: IonicRouteStrategy };
}

export function storageService() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [StorageService],
    multi: true,
  };
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    routeReuseStrategy(),
    storageService(),
    provideHttpClient(withInterceptorsFromDi()),
    SQLite,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
