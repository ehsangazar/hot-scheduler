import { FC, SyntheticEvent, useState } from "react";
import { YearPickerContainer, YearPickerPopup } from "./style";
interface YearPicker {
  year: number;
  setYear: (year: number) => void;
}

const YearPicker: FC<YearPicker> = ({ year, setYear }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(year);

  const submitForm = (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    setYear(inputValue);
  };
  return (
    <form onSubmit={submitForm}>
      <YearPickerContainer>
        <span onClick={() => setShowInput((prev) => !prev)}>{year}</span>

        {showInput && (
          <YearPickerPopup>
            <input onChange={(event) => setInputValue(+event.target.value)} />
            <button type="submit">GO</button>
          </YearPickerPopup>
        )}
      </YearPickerContainer>
    </form>
  );
};

export default YearPicker;
