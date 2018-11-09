import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
// import { JwtModule } from '@auth0/angular-jwt';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AgmCoreModule } from '@agm/core';

import { AppRoutes } from './app.routing';
import { DashboardItems } from './shared/menu-items/dashboard-items';
import { AppComponent } from './app.component';
import { RhAdminLayoutComponent } from './layouts/rh-admin/rh-admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import {StocksAdminLayoutComponent} from './layouts/stocks-admin/stocks-admin-layout.component';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthenticationService} from './authentication/authentication.service';
import {AccountsAdminLayoutComponent} from './layouts/accounts-admin/accounts-admin-layout.component';
import {JwtModule} from '@auth0/angular-jwt';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    StocksAdminLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    AccountsAdminLayoutComponent,
    RhAdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'YOURAPIKEY'}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
  ],
  providers: [AuthenticationService, DashboardItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
