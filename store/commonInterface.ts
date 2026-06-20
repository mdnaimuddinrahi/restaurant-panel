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

export interface RequestParams {
    page_number?: number
    page_size?: number | null
    search_term?: string | null
    search_fields?: string | null
    sort_field?: string | null
    is_ascending?: boolean
    sort_direction?: string
    from_date?:string |null
    to_date?: string | null
    status?: number | null
}
