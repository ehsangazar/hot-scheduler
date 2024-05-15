export type Options = {
  label: string | number;
  value: string | number;
};
export interface CustomSelectProps {
  options: Options[];
  value: Options;
  onChange: (value: Options) => void;
  selectIcon?: JSX.Element | string | number | null;
}

export interface OptionItemProps {
  isCurrentMonth: boolean;
}
