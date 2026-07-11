
import { InputHTMLAttributes, ReactNode, useState } from "react";

export interface CommonResponse<T> {
    message: string
    data: T
}

export interface ResourceOption {
  value: number
  label: string
}

export interface TableColumn<T> {
  key: keyof T
  label: string
  isSort: boolean
  isVisible: boolean;
}

export interface SortState<T> {
  col: keyof T
  dir: "asc" | "desc"
}

export interface RequestParams {
    paginate?: boolean
    page_name?: string 
    page?: number
    per_page?: number
    search_term?: string
    search_fields?: string
    sort_type?: string
    sort_by?: string | null
}

export type TableQueries = {
    total?: number
    page?: number
    per_page?: number
    query?: string
    sort_type?: string
    sort_by?: string | null
}

export interface Headers {
    xCurrentPage: number
    xHasNextPage: boolean
    xHasPreviousPage: boolean
    xTotalCount: number
    xTotalPages: number
}

export type MetaData = {
    // [key: string]: string | number | boolean | null
    total: number, //20,
    per_page: number, //5,
    last_page: number, //4,
    current_page: number, //1,
    prev_page_url: boolean, //false,
    next_page_url: boolean, //true

}

export interface PaginationProps {
    totalDataCount: number; 
    tablePage: number; 
    tablePageSize: number;
    setTablePage: (page: number) => void; 
    setTablePageSize: (size: number) => void;
}


export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?:string;
  required?: boolean;
  error?: string;
  type?: string;
  icon?: ReactNode;
}