import { toast, Slide, ToastOptions } from "react-toastify";

const getTheme = () => {
  if (typeof window === "undefined") return "light";

  return localStorage.getItem("darkMode") === "true"
    ? "dark"
    : "light";
};

const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: getTheme(),
  transition: Slide,
};

export const appToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultOptions,
      ...options,
      theme: getTheme(), // Always use the latest theme
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      ...defaultOptions,
      ...options,
      theme: getTheme(),
    }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, {
      ...defaultOptions,
      ...options,
      theme: getTheme(),
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, {
      ...defaultOptions,
      ...options,
      theme: getTheme(),
    }),
};