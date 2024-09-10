import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ReaderModule } from './reader/reader.module';
import { WriterModule } from './writer/writer.module';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

export function tokenGetter() {
  return localStorage.getItem("accessToken");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule, ReaderModule, WriterModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44330"]
      }
    }),
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'line-scale-pulse-out' })
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:44330/api',
      multi: false
    },
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
