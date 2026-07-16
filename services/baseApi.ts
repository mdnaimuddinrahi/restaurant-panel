import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store/store";
import { baseQueryWithReAuth } from "@/store/baseQuery";
import { DEFAULT_TAG, TAG_VALUES } from "@/store/commonConstants";


export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: TAG_VALUES,
  endpoints: () => ({}),
});