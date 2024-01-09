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
  orderField?: any;
  orderDirection?: any;
}

export interface CustomDatasource {
  data: any[];
  total: number;
}

export interface TablePaginatedListInput {
  page: number;
  limit: number;
  orderField?: any;
  orderDirection?: 'ASC' | 'DESC',
  search?: string;
}
