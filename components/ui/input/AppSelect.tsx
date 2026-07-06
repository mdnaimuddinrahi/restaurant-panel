import { useTheme } from "@/theme";
import { BiChevronDown } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import Select, {
  GroupBase,
  Props,
  components,
  DropdownIndicatorProps,
} from "react-select";
// import { ChevronDown } from "lucide-react";

export interface AppSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Props<Option, IsMulti, Group> {
  label?: string;
  error?: string;
  accentColor?: string;
}

function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <FaAngleDown

        size={18}
        className={`transition-transform duration-300 ease-in-out ${
          props.selectProps.menuIsOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </components.DropdownIndicator>
  );
}
export interface SelectOption {
  value: string | number;
  label: string;
}

export default function AppSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  error,
  required,
  ...props
}: AppSelectProps<Option, IsMulti, Group>) {
  const isDark = document.documentElement.classList.contains("dark");
  // const isDark = false; // willl upddate later.

  const {accentColor} = useTheme();
  const isError = !!error;

  return (
    <div className="w-full">
      {/* {label && (
        <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )} */}
      {label && (
        <label
          className={`
            mb-1.5 block text-xs font-medium transition-colors duration-300
            ${
              isError
                ? "text-red-500"
                : "text-slate-500 dark:text-slate-200"
            }
          `}
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <Select
        {...props}
        components={{
          DropdownIndicator,
        }}
        menuPosition="fixed"
        classNamePrefix="app-select"
        className="text-xs"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: 44,
            borderRadius: 8,
            cursor: "pointer",
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            borderColor: error
              ? "#ef4444"
              : state.isFocused
              ? accentColor
              : isDark
              ? "#334155"
              : "#e2e8f0",

  boxShadow:
  state.isFocused
    ? isError
      ? "0 0 0 4px rgb(239 68 68 / 0.10)"
      : `0 0 0 4px ${accentColor}20`
    : "none",

transition: "all 200ms cubic-bezier(.4,0,.2,1)",

"&:hover": {
  borderColor: isError ? "#ef4444" : accentColor,
},
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "2px 12px",
          }),

          input: (base) => ({
            ...base,
            color: isDark ? "#f8fafc" : "#0f172a",
          }),

          singleValue: (base) => ({
            ...base,
            color: isDark ? "#f8fafc" : "#0f172a",
          }),

          placeholder: (base) => ({
            ...base,
            // color: isDark ? "#94a3b8" : "#64748b",
            color: isError
              ? "#fca5a5" // Tailwind red-300
              : isDark
              ? "#94a3b8"
              : "#64748b",
          }),

          menuPortal: (base) => ({
            ...base,
            zIndex: 999999999,
          }),

          menu: (base) => ({
            ...base,
            zIndex: 999999999,
            overflow: "hidden",
            borderRadius: 12,
            backgroundColor: isDark ? "#1e293b" : "#ffffff",
            border: `1px solid ${
              isDark ? "#334155" : "#e2e8f0"
            }`,
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
            animation: "fadeUp 180ms ease-out",
          }),

          menuList: (base) => ({
            ...base,
            padding: 6,
          }),

          option: (base, state) => ({
            ...base,
            cursor: "pointer",
            borderRadius: 8,
            marginBottom: 2,

            backgroundColor: state.isSelected
              ? accentColor
              : state.isFocused
              ? `${accentColor}20`
              : "transparent",

            color: state.isSelected
              ? "#fff"
              : isDark
              ? "#f8fafc"
              : "#0f172a",

            transition:
              "background-color .2s ease,color .2s ease,transform .2s ease",

            "&:active": {
              transform: "scale(.98)",
            },
          }),

          multiValue: (base) => ({
            ...base,
            borderRadius: 8,
            backgroundColor: `${accentColor}20`,
          }),

          multiValueLabel: (base) => ({
            ...base,
            color: accentColor,
            fontWeight: 500,
          }),

          multiValueRemove: (base) => ({
            ...base,
            color: accentColor,

            ":hover": {
              backgroundColor: accentColor,
              color: "#fff",
            },
          }),

          dropdownIndicator: (base) => ({
            ...base,
            color: isDark ? "#94a3b8" : "#64748b",
            paddingRight: 12,
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),

          clearIndicator: (base) => ({
            ...base,
            transition: "all .2s ease",
          }),
        }}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}