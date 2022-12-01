import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe<T extends { [x: string]: any }> implements PipeTransform {
  transform(list: T[], isAscending: boolean, header: string): T[] {
    if (!Array.isArray(list)) return list;

    if (isAscending) {
      return list.sort((a, b) => {
        return typeof a[header] === 'number' && typeof b[header] === 'number'
          ? a[header] - b[header]
          : String(a[header]).localeCompare(String(b[header]));
      });
    } else {
      return list.sort((a, b) => {
        return typeof a[header] === 'number' && typeof b[header] === 'number'
          ? b[header] - a[header]
          : String(b[header]).localeCompare(String(a[header]));
      });
    }
  }
}
