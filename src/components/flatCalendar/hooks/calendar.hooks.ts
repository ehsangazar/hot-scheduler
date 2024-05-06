import useGaregorian from "./garegorian.hooks";
import useJalali from "./jalalai.hooks";

const useCalendar = ({
  type,
  showDisableDays = false,
}: {
  type: "JALALI" | "GREGORIAN";
  showDisableDays?: boolean;
}) => {
  const jalali = useJalali();
  const garegorian = useGaregorian(showDisableDays);

  return garegorian;
};
export default useCalendar;
