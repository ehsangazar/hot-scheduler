import { FC, useState } from "react";
import {
  OptionItem,
  SelectContainer,
  SelectInput,
  SelectOptions,
  ValueContainer,
} from "./style";
import { ChevronDown } from "@/assets/icons";
import { CustomSelectProps, Options } from "./type";

const CustomSelect: FC<CustomSelectProps> = (props) => {
  const {
    options,
    value,
    onChange,
    selectIcon = <ChevronDown style={{ width: "10px" }} />,
  } = props;
  const [showOptions, setShowOptions] = useState(false);
  const handleSelecOptions = (option: Options) => {
    onChange(option);
    setShowOptions(false);
  };

  return (
    <SelectContainer>
      <ValueContainer onClick={() => setShowOptions(true)}>
        <SelectInput>{value.label}</SelectInput>
        {selectIcon}
      </ValueContainer>
      {showOptions && (
        <SelectOptions>
          {options.map((option) => (
            <OptionItem
              key={option.label}
              onClick={() => handleSelecOptions(option)}
              isCurrentMonth={value.value === option.value}
            >
              {option.label}
            </OptionItem>
          ))}
        </SelectOptions>
      )}
    </SelectContainer>
  );
};

export default CustomSelect;
