"use client";

import Select from "react-select";
import { useSelectTheme } from "@/hooks/useSelectTheme";
import SelectDropdownIndicator from "@/components/ui/select/SelectDropdownIndicator";
import ClientOnly from "@/components/ui/ClientOnly";

export default function AppReactSelect(props: any) {
  const selectTheme = useSelectTheme();

  return (
    <ClientOnly>
      <Select
        unstyled
        isSearchable
        classNames={selectTheme.classNames}
        styles={selectTheme.styles}
        components={{
          DropdownIndicator: SelectDropdownIndicator,
        }}
        menuPortalTarget={document.body}
        {...props}
      />
    </ClientOnly>
  );
}