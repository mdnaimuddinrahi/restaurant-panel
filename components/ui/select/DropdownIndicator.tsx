import { components, DropdownIndicatorProps } from "react-select";
import { IoIosArrowDown } from "react-icons/io";

const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowDown
        className={`
          transition-transform duration-300 ease-in-out
          ${props.selectProps.menuIsOpen ? "rotate-180" : "rotate-0"}
        `}
        size={18}
      />
    </components.DropdownIndicator>
  );
};