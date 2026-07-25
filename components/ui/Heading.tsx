import { openModal } from "@/features/modal/modalSlice";
import { useAppDispatch } from "@/store/hooks";
import AppCustomButton from "./button/AppCustomButton";
import { PiCirclesThreePlus } from "react-icons/pi";



export default function Heading({
  title,
  subtitle,
  buttonText,
  modal,
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  modal?: string;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center 
      justify-between mb-1 p-3 bg-white 
      border rounded-lg border-slate-100
      dark:bg-slate-800
      dark:border-slate-700">
      {/* Left side */}
      <div>
        {title && (
          <h1 className="font-display text-2xl font-700 tracking-tight">
            {title}
          </h1>
        )}
        
        {subtitle && (
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right side */}
      {buttonText && modal && (
        <AppCustomButton
          variant="solid"
          onClick={() =>
            dispatch(
              openModal({
                type: modal,
              })
            )
          }
          // className="flex items-center gap-2 px-4 py-2 accent-bg text-white text-sm rounded-xl hover:opacity-90 transition-opacity font-500 shrink-0"
          className="text-sm px-4 py-2 gap-2 "
        >
          <PiCirclesThreePlus className="w-4 h-4"/>

          {buttonText}
        </AppCustomButton>
      )}
    </div>
  );
}