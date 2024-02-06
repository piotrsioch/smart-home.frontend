import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smokeValue',
  standalone: true
})
export class SmokeValuePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value < 100) {
      return "Low"
    } else if(value < 400) {
      return "Medium"
    } else if (value < 1000) {
      return "High"
    } else {
      return "Very high"
    }
  }

}
