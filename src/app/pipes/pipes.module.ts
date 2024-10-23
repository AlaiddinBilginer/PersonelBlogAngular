import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';
import { TimeAgoPipe } from './time-ago.pipe';

@NgModule({
  declarations: [
    FormatDatePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatDatePipe,
    TimeAgoPipe
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'tr-TR' }
  ]
})
export class PipesModule { }
