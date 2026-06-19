export interface CommonResponse<T> {
    message: string
    data: T
}

export interface ResourceOption {
  value: number;
  label: string;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  isSort: boolean;
}

export interface SortState<T> {
  col: keyof T | "";
  dir: "asc" | "desc";
}
