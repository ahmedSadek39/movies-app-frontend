export interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Ids {
  ids: string[];
}

export interface Page {
  headerAr: string;
  headerEn: string;
  path: string;
  permission: 'ADMIN' | 'USER';
  show?: boolean;
}