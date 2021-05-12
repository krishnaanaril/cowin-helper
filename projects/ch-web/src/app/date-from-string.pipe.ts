import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromString'
})
export class DateFromStringPipe implements PipeTransform {

  transform(value: string): Date {
    const splitValues = value.split('-');
    const expectedDate = new Date(+splitValues[2], (+splitValues[1]-1), +splitValues[0]);
    return expectedDate;
  }

}
