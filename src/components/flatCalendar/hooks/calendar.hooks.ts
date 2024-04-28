import useGaregorian from "./garegorian.hooks";
import useJalali from "./jalalai.hooks";

const useCalendar = ({
  type,
  showDisableDays = false,
}: {
  type: "JALALI" | "GAREGORIAN";
  showDisableDays?: boolean;
}) => {
  const jalali = useJalali(showDisableDays);
  const garegorian = useGaregorian(showDisableDays);

  return type === "JALALI" ? jalali : garegorian;
};
export default useCalendar;
