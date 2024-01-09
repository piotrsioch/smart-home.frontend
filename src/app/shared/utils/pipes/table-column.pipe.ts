import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";
import { TableColumnType } from "../../components/table/table.assets";

@Pipe({
  name: 'tableColumn',
  standalone: true
})
export class TableColumnPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {
  }

  transform(value: any, type: TableColumnType | undefined): any {
    if (!type) {
      return value;
    }

    switch (type) {
      case TableColumnType.DATE:
        return this.datePipe.transform(value, 'short');
      default:
        return value;
    }
  }
}
