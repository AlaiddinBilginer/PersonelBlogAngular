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

import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule, ReaderModule, WriterModule,
    SharedModule
  ],
  providers: [
    {
      provide: 'baseUrl',
      useValue: 'https://localhost:44330/api',
      multi: false
    },
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
