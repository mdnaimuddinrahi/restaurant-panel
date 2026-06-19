"use client";

import Select from "react-select";
import { useSelectTheme } from "@/hooks/useSelectTheme";
// import {DropdownIndicator} from "./DropdownIndicator"
import SelectDropdownIndicator from "@/components/ui/select/SelectDropdownIndicator";

export default function AppSelect(props: any) {
  const selectTheme = useSelectTheme();

  return (
    <Select
      isClearable={true}
      unstyled
      isSearchable
      classNames={selectTheme.classNames}
      styles={selectTheme.styles}
      components={{
        DropdownIndicator: SelectDropdownIndicator,
      }}
      {...props}
      
    />
  );
}