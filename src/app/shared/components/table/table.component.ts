import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { CustomDatasource, PageChangedData, TableColumn } from "./table.assets";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { DataPropertyGetterPipe } from "../../utils/pipes/data-property-getter.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { TableColumnPipe } from "../../utils/pipes/table-column.pipe";

@Component({
  selector: 'sh-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    DataPropertyGetterPipe,
    MatButtonModule,
    MatInputModule,
    TableColumnPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[];

  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Input() isMobile = true;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() paginationSizes: number[] = [5, 10, 20];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() totalItemCount: number = 0;

  @Output() sortChanged: EventEmitter<Sort> = new EventEmitter();
  @Output() pageChanged: EventEmitter<PageChangedData> = new EventEmitter<PageChangedData>();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();

  @Input() set tableData(data: CustomDatasource) {
    this.setTableDataSource(data);

    this.tableDataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
  }

  setTableDataSource(data: CustomDatasource): void {
    // @ts-ignore
    this.tableDataSource = new MatTableDataSource<any>(data.data);
    this.tableDataSource.sort = this.sort;

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortTable(sortParameters: Sort): void {
    sortParameters.active = this.tableColumns.find(column => column.name === sortParameters.active)!.dataKey;
    this.sortChanged.emit(sortParameters);
  }

  emitRowAction(row: any): void {
    this.rowAction.emit(row);
  }

  pageChangeEvent(event: any): void {
    this.pageChanged.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
    });
  }
}
