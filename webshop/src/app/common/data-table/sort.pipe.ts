import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe<T extends { [x: string]: any }> implements PipeTransform {
  headerChange(list: T[], isAscending: boolean, header: string, type: string) {
    header = header.slice(3).toLowerCase();
    if (isAscending) {
      return list.sort((a, b) => {
        return typeof a[type][header] === 'number' &&
          typeof b[type][header] === 'number'
          ? a[type][header] - b[header][type]
          : String(a[type][header]).localeCompare(String(b[type][header]));
      });
    } else {
      return list.sort((a, b) => {
        return typeof a[type][header] === 'number' &&
          typeof b[type][header] === 'number'
          ? b[type][header] - a[type][header]
          : String(b[type][header]).localeCompare(String(a[type][header]));
      });
    }
  }

  transform(list: T[], isAscending: boolean, header: string): T[] {
    if (!Array.isArray(list)) return list;

    if (header.includes('cat')) {
      this.headerChange(list, isAscending, header, 'category');
    }

    if (header.includes('add')) {
      this.headerChange(list, isAscending, header, 'address');
    }

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
