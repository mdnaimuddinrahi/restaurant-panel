import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";

// console.log('import.met.env', import.meta.env)
export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token;
      if(!token) {
        // Try to get token from localStorage as a fallback
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const { accessToken } = JSON.parse(storedAuth);
          headers.set("authorization", `Bearer ${accessToken}`);
        }
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
// const baseQuery = fetchBaseQuery({
//   // baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   baseUrl: "http://localhost:8000/api",
//   credentials: "include",

//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;

//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }

//     headers.set("accept", "application/json");
//     return headers;
//   },
// });

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery,
//   tagTypes: ["Auth", "Product", "Order", "Category", "Customer"],
//   endpoints: () => ({}),
// });