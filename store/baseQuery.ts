import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";

const baseQuery = fetchBaseQuery({
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
  });

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  const result = await baseQuery(args, api, extraOptions);

  const errorData = result.error?.data as {
    code?: number;
    message?: string;
  };

  if (errorData?.code === 401) {

    // remove localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("auth");

    // remove cookie
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // reset redux cache
    api.dispatch({ type: "auth/logout" });

    // redirect login
    window.location.href = "/admin-login";
  }

  return result;
};