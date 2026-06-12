export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  PRODUCTS: {
    LIST: "/products",
    CREATE: "/products",
    UPDATE: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },

  CATEGORIES: {
    LIST: "/categories",
  },

  ORDERS: {
    LIST: "/orders",
    CREATE: "/orders",
  },
};