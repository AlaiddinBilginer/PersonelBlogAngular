import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    const today = new Date();
    const difference = today.getTime() - new Date(value).getTime();
    const daysAgo = Math.floor(difference /(1000 * 3600 * 24));

    if(daysAgo === 0) {
      return 'Bugün';
    } else if(daysAgo === 1) {
      return 'Dün';
    } else {
      return `${daysAgo} gün önce`;
    }
  }

}
