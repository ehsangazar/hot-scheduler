import { useEffect, useState } from "react";
import moment from "moment";
import { gregorianMonthOprions } from "@/constants/string";
import { Options } from "@/components/common/Select/type";

const useGaregorian = (showDisableDays: boolean) => {
  const todayNumber = moment().date();
  const [monthNumber, setMonthNumber] = useState<number>(moment().month() || 0);
  const [selectMonth, setSelectMonth] = useState<Options>(
    gregorianMonthOprions[monthNumber]
  );
  const [yearsNumber, setYearsNumber] = useState<number>(moment().year() || 0);
  const [lastMonth, setLastMonth] = useState<string>("");
  const [nextMonth, setNextMonth] = useState<string>("");
  const [lastMonthDisabledDays, setLastMonthDisabledDays] = useState<number[]>(
    []
  );
  const [nextMonthDisabledDays, setNextMonthDisabledDays] = useState<number[]>(
    []
  );

  const [showDay, setShowDay] = useState<number[]>([]);

  useEffect(() => {
    const year = moment().year();
    const month = moment().month();

    setMonthNumber(month);
    setYearsNumber(year);
  }, []);

  useEffect(() => {
    const days = moment(`${yearsNumber}-${monthNumber + 1}-01`).day();
    const currentDaysInMonth = moment(
      `${yearsNumber}-${monthNumber + 1}`,
      "YYYY-MM"
    ).daysInMonth();

    const mainShowDay = Array.from(
      {
        length: currentDaysInMonth,
      },
      (_, i) => i + 1
    );
    // if showDisabledDays is true , show last month and next month days
    if (showDisableDays) {
      const lastMonth = moment(
        `${yearsNumber}-${monthNumber + 1}-${todayNumber}`
      )
        .subtract(1, "months")
        .format("YYYY-MM-DD");
      const endOfMonth = moment(`${yearsNumber}-${monthNumber + 1}`, "YYYY-MM")
        .endOf("month")
        .day();

      const lastMonthDisabledDays = Array.from(
        {
          length: moment(lastMonth, "YYYY-MM").daysInMonth(),
        },
        (_, i) => i + 1
      )
        .reverse()
        .slice(0, days ? days - 1 : 6)
        .reverse();

      const nextMonthDisabledDays = Array.from(
        { length: endOfMonth ? 7 - endOfMonth : 0 },
        (_, i) => i + 1
      );
      setLastMonth(lastMonth);
      setNextMonth(String(endOfMonth));

      setLastMonthDisabledDays(lastMonthDisabledDays);
      setNextMonthDisabledDays(nextMonthDisabledDays);
      setShowDay(mainShowDay);
    } else {
      // else show normal days of month
      const beforShowDays = Array.from(
        { length: days ? days - 1 : 6 },
        () => 0
      );
      setShowDay([...beforShowDays, ...mainShowDay]);
    }
  }, [yearsNumber, monthNumber, showDisableDays]);

  const handleSelectMonth = (monthName: Options) => {
    if (monthName) {
      setSelectMonth(monthName);
      const convertedNameToNumber = Number(
        moment().month(monthName.value).format("M")
      );
      setMonthNumber(convertedNameToNumber - 1);
    }
  };
  const handleNxtMonth = () => {
    setMonthNumber((monthNumber) => (monthNumber === 11 ? 0 : monthNumber + 1));
    if (monthNumber === 11) {
      setYearsNumber((monthNumber) => monthNumber + 1);
    }
    setSelectMonth(gregorianMonthOprions[monthNumber + 1]);
  };

  const handlePrvMonth = () => {
    setMonthNumber((monthNumber) => (monthNumber === 0 ? 11 : monthNumber - 1));
    if (monthNumber === 0) {
      setYearsNumber((monthNumber) => monthNumber - 1);
    }
    setSelectMonth(gregorianMonthOprions[monthNumber - 1]);
  };

  return {
    lastMonth,
    nextMonth,
    lastMonthDisabledDays,
    nextMonthDisabledDays,
    showDay,
    handleNxtMonth,
    handlePrvMonth,
    monthNumber,
    yearsNumber,
    todayNumber,
    selectMonth,
    handleSelectMonth,
  };
};
export default useGaregorian;
