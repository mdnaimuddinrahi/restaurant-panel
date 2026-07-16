import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import { baseApi } from "@/services/baseApi";
import modalReducer from "@/features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;