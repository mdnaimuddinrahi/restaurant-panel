  "use client";

  import Label from "../Label";
  import ClientOnly from "../ClientOnly";
  import { useTheme } from "@/theme";
  import { FaAngleDown } from "react-icons/fa6";
  import Select, {
    components,
    DropdownIndicatorProps,
    GroupBase,
    Props,
  } from "react-select";
  import { useMemo } from "react";

  export interface AppSelectProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
  > extends Props<Option, IsMulti, Group> {
    label?: string;
    name?: string;
    error?: string;
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
          className={`transition-transform duration-300 ${
            props.selectProps.menuIsOpen ? "rotate-180" : ""
          }`}
        />
      </components.DropdownIndicator>
    );
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
    const { accentColor, darkMode } = useTheme();

    const styles = useMemo(
      () => ({
        control: (base: any, state: any) => ({
          ...base,
          minHeight: 44,
          borderRadius: 8,
          cursor: "pointer",
          transition: "all .2s",

          backgroundColor: darkMode ? "#1e293b" : "#fff",

          borderColor: error
            ? "#ef4444"
            : state.isFocused
            ? accentColor
            : darkMode
            ? "#334155"
            : "#e2e8f0",

          boxShadow: state.isFocused
            ? error
              ? "0 0 0 4px rgb(239 68 68 / .12)"
              : `0 0 0 4px ${accentColor}20`
            : "none",

          "&:hover": {
            borderColor: error ? "#ef4444" : accentColor,
          },
        }),

        valueContainer: (base: any) => ({
          ...base,
          padding: "2px 12px",
        }),

        input: (base: any) => ({
          ...base,
          color: darkMode ? "#f8fafc" : "#0f172a",
        }),

        singleValue: (base: any) => ({
          ...base,
          color: darkMode ? "#f8fafc" : "#0f172a",
        }),

        placeholder: (base: any) => ({
          ...base,
          color: error
            ? "#fca5a5"
            : darkMode
            ? "#94a3b8"
            : "#64748b",
        }),

        menuPortal: (base: any) => ({
          ...base,
          zIndex: 999999,
        }),

        menu: (base: any) => ({
          ...base,
          zIndex: 999999,
          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: darkMode ? "#1e293b" : "#fff",
          border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          boxShadow:
            "0 20px 40px rgba(0,0,0,.12), 0 8px 16px rgba(0,0,0,.08)",
        }),

        menuList: (base: any) => ({
          ...base,
          padding: 6,
        }),

        option: (base: any, state: any) => ({
          ...base,
          cursor: "pointer",
          borderRadius: 8,
          marginBottom: 2,
          transition: "all .2s",

          backgroundColor: state.isSelected
            ? accentColor
            : state.isFocused
            ? `${accentColor}20`
            : "transparent",

          color: state.isSelected
            ? "#fff"
            : darkMode
            ? "#f8fafc"
            : "#0f172a",

          "&:active": {
            transform: "scale(.98)",
          },
        }),

        multiValue: (base: any) => ({
          ...base,
          borderRadius: 8,
          backgroundColor: `${accentColor}20`,
        }),

        multiValueLabel: (base: any) => ({
          ...base,
          color: accentColor,
          fontWeight: 500,
        }),

        multiValueRemove: (base: any) => ({
          ...base,
          color: accentColor,
          ":hover": {
            backgroundColor: accentColor,
            color: "#fff",
          },
        }),

        dropdownIndicator: (base: any) => ({
          ...base,
          color: darkMode ? "#94a3b8" : "#64748b",
          paddingRight: 12,
        }),

        indicatorSeparator: () => ({
          display: "none",
        }),

        clearIndicator: (base: any) => ({
          ...base,
          transition: "all .2s",
        }),
      }),
      [accentColor, darkMode, error]
    );

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

        <ClientOnly>
          <Select<Option, IsMulti, Group>
            inputId={name}
            unstyled
            isSearchable
            menuPosition="fixed"
            menuPortalTarget={document.body}
            components={{
              DropdownIndicator,
            }}
            styles={styles}
            {...props}
          />
        </ClientOnly>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }