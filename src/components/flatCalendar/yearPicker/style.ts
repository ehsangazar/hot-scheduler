import styled from "styled-components";

interface RowContainerInterface {
  gap?: string;
}

export const YearPickerContainer = styled.div<RowContainerInterface>`
  position: relative;
  cursor: pointer;
`;
export const YearPickerPopup = styled.div<RowContainerInterface>`
  position: absolute;
  background-color: #fff;
  display: flex;
  align-items: center;
`;
