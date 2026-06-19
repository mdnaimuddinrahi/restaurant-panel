import { components, DropdownIndicatorProps } from "react-select";
import { IoIosArrowDown } from "react-icons/io";

export default function SelectDropdownIndicator(
  props: DropdownIndicatorProps<any>
) {
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowDown
        size={16}
        className={`
          text-slate-400
          transition-transform duration-300 ease-in-out
          ${props.selectProps.menuIsOpen ? "rotate-180" : ""}
        `}
      />
    </components.DropdownIndicator>
  );
}