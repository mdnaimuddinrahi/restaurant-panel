"use client"
import { useTheme } from "@/theme";
import { BiChevronDown } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import Select, {
  GroupBase,
  Props,
  components,
  DropdownIndicatorProps,
  MultiValue,
  SingleValue,
} from "react-select";
import Label from "../Label";

function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <FaAngleDown
        size={16}
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

export interface AppSelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<Props<Option, IsMulti, Group>, "onChange"> {
  onChange?: (
    value: IsMulti extends true
      ? MultiValue<Option>
      : SingleValue<Option>
  ) => void;

  label?: string;
  name?: string;
  error?: string;
}

export default function AppSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  label,
  name,
  error,
  required,
  ...props
}: AppSelectProps<Option, IsMulti, Group>) {
  // const isDark = document.documentElement.classList.contains("dark");
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {
  //   setIsDark(localStorage.getItem("darkMode") === "true");
  // }, []);

  const {accentColor, darkMode: isDark} = useTheme();
  const isError = !!error;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={name}
          label={label}
          required={required}
          isError={!!error}
        />
      )}

      <Select
        instanceId={name ?? "app-select"}
        inputId={name}
        {...props}
        components={{
          DropdownIndicator,
        }}
        menuPosition="fixed"
        classNamePrefix="app-select"
        className="text-sm"
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
        onChange={(value) => props.onChange?.(value)}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}