import styled from "styled-components";
import { OptionItemProps } from "./type";

export const SelectInput = styled.div`
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;
export const SelectContainer = styled.div`
  position: relative;
`;
export const SelectOptions = styled.div`
  position: absolute;
  background-color: white;
  color: black;
  cursor: pointer;
  max-height: 200px;
  overflow-y: scroll;
`;
export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;
export const OptionItem = styled.p<OptionItemProps>`
  padding: 10px;
  background: ${(props) => (props?.isCurrentMonth ? "#e3e3e3" : ``)};
`;
