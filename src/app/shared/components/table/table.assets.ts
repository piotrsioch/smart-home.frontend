export enum TableColumnType {
  DATE = 'date',
}

export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
  type?: TableColumnType;
}

export interface PageChangedData {
  pageIndex: number;
  pageSize: number;
}

export interface CustomDatasource {
  data: any[];
  total: number;
}
