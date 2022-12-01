import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T extends { [x: string]: any }>
  implements PipeTransform
{
  transform(list: T[], key: string, phrase: string): T[] {
    if (!Array.isArray(list) || !key || !phrase) return list;

    return list.filter((item) => {
      return String(item[key]).toLowerCase().includes(phrase.toLowerCase());
    });
  }
}
