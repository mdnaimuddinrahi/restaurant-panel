import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import { baseApi } from "@/services/baseApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  //   cart: cartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: false, // important for POS (dates, objects, etc.)
    // }),
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;