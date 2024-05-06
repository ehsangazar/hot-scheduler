import { CSSProperties, FC } from "react";
import {
  GridContainer,
  FlatContainer,
  RowContainer,
  RowContainerBetween,
  GridItemContainer,
} from "./style";

import moment from "moment";
import NextIcon from "@/assets/icons/Next";
import PrevIcon from "@/assets/icons/Prev";

import {
  gregorianDays,
  gregorianMonth,
  jalaliDays,
} from "../../constants/string";
import useCalendar from "./hooks/calendar.hooks";

interface FlatCalender {
  width?: string;
  height?: string;
  iconsStyle?: CSSProperties;
  titleStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  calenderType?: "JALALI" | "GREGORIAN";
  nextMonthIcon?: JSX.Element | string | number;
  prevMonthIcon?: JSX.Element | string | number;
  todayBackground?: string;
  showDisableDays?: boolean;
}
const FlatCalendar: FC<FlatCalender> = ({
  height,
  width,
  iconsStyle,
  titleStyle,
  containerStyle,
  calenderType = "GREGORIAN",
  nextMonthIcon = <NextIcon />,
  prevMonthIcon = <PrevIcon />,
  todayBackground = "#e2e2e2",
  showDisableDays = false,
}) => {
  const rtlCondition = calenderType === "GREGORIAN";
  const calendarState = useCalendar({ type: calenderType });

  const {
    lastMonth,
    nextMonth,
    lastMonthDisabledDays,
    nextMonthDisabledDays,
    showDay,
    handleNxtMonth,
    handlePrvMonth,
    yearsNumber,
    monthNumber,
    todayNumber,
  } = calendarState;

  return (
    <FlatContainer
      height={height}
      width={width}
      rtl={rtlCondition}
      style={containerStyle || {}}
    >
      <RowContainerBetween>
        <RowContainer style={iconsStyle || {}}>
          <span>{gregorianMonth[monthNumber]}</span>
          <span>{yearsNumber}</span>
        </RowContainer>
        {
          <RowContainer gap="2rem" style={titleStyle || {}}>
            <span onClick={handlePrvMonth}>{prevMonthIcon}</span>
            <span onClick={handleNxtMonth}>{nextMonthIcon}</span>
          </RowContainer>
        }
      </RowContainerBetween>
      <GridContainer>
        {(calenderType === "JALALI" ? jalaliDays : gregorianDays).map(
          (item, i) => (
            <GridItemContainer key={i}>{item}</GridItemContainer>
          )
        )}
      </GridContainer>
      <GridContainer>
        {showDisableDays &&
          lastMonthDisabledDays.map((item, i) => (
            <GridItemContainer
              isWeekend={
                !!item &&
                (moment(`${lastMonth}`).day() === 0 ||
                  moment(`${lastMonth}`).day() === 6)
              }
              isDisableDay={showDisableDays}
              key={i}
            >
              {item}
            </GridItemContainer>
          ))}
        {showDay.map((item, i) => (
          <GridItemContainer
            isWeekend={
              !!item &&
              (moment(`${yearsNumber}-${monthNumber + 1}-${item}`).day() ===
                0 ||
                moment(`${yearsNumber}-${monthNumber + 1}-${item}`).day() === 6)
            }
            isToday={todayNumber === item}
            todayBackground={todayBackground}
            key={i}
          >
            {!!item && item}
          </GridItemContainer>
        ))}
        {showDisableDays &&
          nextMonthDisabledDays.map((item, i) => (
            <GridItemContainer
              isDisableDay={showDisableDays}
              isWeekend={
                !!item &&
                (moment(`${nextMonth}-${item}`).day() === 0 ||
                  moment(`${nextMonth}-${item}`).day() === 6)
              }
              key={i}
            >
              {item}
            </GridItemContainer>
          ))}
      </GridContainer>
    </FlatContainer>
  );
};
export default FlatCalendar;
