export function formatVND(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
export function changeDateFormat(date) {
  let array = date.split(" ");
  return array[1] + " " + array[0];
}
function decimalAdjust(type, value, exp) {
  type = String(type);
  if (!["round", "floor", "ceil"].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
    );
  }
  exp = Number(exp);
  value = Number(value);
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN;
  } else if (exp === 0) {
    return Math[type](value);
  }
  const [magnitude, exponent = 0] = value.toString().split("e");
  const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${+newExponent + exp}`);
}
export function round10(value, exp) {
  return decimalAdjust("round", value, exp);
}
export function isObjectEmpty(objectName) {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
}
const MONTHS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
  // "March",
  // "April",
  // "May",
  // "June",
  // "July",
  // "August",
  // "September",
  // "October",
  // "November",
  // "December",
];

export function months(config) {
  var cfg = config || {};
  var count = cfg.count || 12;
  var section = cfg.section;
  var values = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}
// (int) The current year
export const THIS_YEAR = +new Date().getFullYear();
// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +new Date().getMonth() + 1;
// Week days names and shortnames
export const WEEK_DAYS = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};
// Calendar months names and short names
export const CALENDAR_MONTHS = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
// Weeks displayed on calendar
export const CALENDAR_WEEKS = 6;
// Pads a string value with leading zeroes(0) until length is reached
// For example: zeroPad(5, 2) => "05"
export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, "0");
};
// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;
  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
    ? 30
    : 31;
};
// (int) First day of the month for a given year from 1 - 7
// 1 => Sunday, 7 => Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +new Date(`${year}-${zeroPad(month, 2)}-01`).getDay() + 1;
};

export const getPercent = (valueCurrent, valuePrevious) => {
  if (valuePrevious == 0 && valueCurrent == 0) {
    return {
      percent: 0,
      isHigher: null,
    };
  } else if (valuePrevious == 0 && valueCurrent > 0) {
    return {
      percent: 0,
      isHigher: true,
    };
  } else {
    //% (tăng trưởng, lợi nhuận…) = (Năm sau – Năm trước)/Năm trước * 100.
    let percent = Math.round(
      ((valueCurrent - valuePrevious) / valuePrevious) * 100
    );
    if (percent > 0) {
      return {
        percent: percent,
        isHigher: true,
      };
    } else {
      return {
        percent: percent * -1,
        isHigher: false,
      };
    }
  }
};
