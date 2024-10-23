import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: Date, format: string = `dd MMMM yyyy`): string {
    return this.datePipe.transform(value, format, '', 'tr-TR');
  }

}
