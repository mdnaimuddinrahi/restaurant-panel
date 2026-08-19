export const DEFAULT_PAGINATION = {
    PAGINATE: true,
    PER_PAGE: 5,
    CURRENT_PAGE: 0,
    LAST_PAGE: 0,
    TOTAL: 0,
    PAGE_NAME: "employee_page",
    PAGE_OPTIONS:  [
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        // { label: "50", value: 50 },
        { label: "100", value: 100 },
    ],
}

export const DEFAULT_SEARCH = {
    SEARCH_FIELD: "",
    SEARCH_TERM: "",
    SORT_TYPE: "asc",
    SORT_BY: "id",
    NUMBER: -1,   
}

export const DEFAULT_TAG_SCOPE = {
    LIST: "LIST",
    RESOURCE: "RESOURCE"
} as const

export const DEFAULT_TAG = {
  EMPLOYEE: "Employee",
  ROLE: "Role",
  EMPLOYEE_TYPE: "EmployeeType",
  EMPLOYEE_DESIGNATION: "EmployeeDesignation"
} as const;

export const TAG_VALUES = Object.values(DEFAULT_TAG);
export const DEFAULT_METHOD  = {
    GET:"GET",
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
}

export const INVALID_NUMBER = -1

export const STATUS_ACTIVE = 1
export const STATUS_INACTIVE = 0