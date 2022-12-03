import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe<T extends { [x: string]: any }>
  implements PipeTransform
{
  keyChange(list: T[], key: string, phrase: string, type: string) {
    key = key.slice(3).toLowerCase();

    return list.filter((item) => {
      return String(item[type][key])
        .toLowerCase()
        .includes(phrase.toLowerCase());
    });
  }

  transform(list: T[], key: string, phrase: string): T[] {
    if (!Array.isArray(list) || !key || !phrase) return list;

    if (key.includes('cat')) {
      return this.keyChange(list, key, phrase, 'category');
    }

    if (key.includes('add')) {
      return this.keyChange(list, key, phrase, 'address');
    }

    return list.filter((item) => {
      return String(item[key]).toLowerCase().includes(phrase.toLowerCase());
    });
  }
}
