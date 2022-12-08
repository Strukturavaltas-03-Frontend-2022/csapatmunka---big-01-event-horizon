import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number | string): string | number {
    if (typeof value === 'string') value = Number(value);

    if (value > 10000) {
      return value.toString() + ' CAD';
    }
    return value;
  }
}
