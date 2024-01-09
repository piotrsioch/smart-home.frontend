export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left';
  isSortable?: boolean;
}

export interface PageChangedData {
  pageIndex: number;
  pageSize: number;
}

export interface CustomDatasource {
  data: any[];
  total: number;
}
