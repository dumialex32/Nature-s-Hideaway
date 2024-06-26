import { add, differenceInDays, formatDistance, parseISO } from "date-fns";
import { isEmpty } from "lodash";

export const fromToday = (days, withTime) => {
  const date = add(new Date(), { days: days });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date;
};

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) => {
  // console.log(
  //   `date1: ${parseISO(String(dateStr1))}, date2:${parseISO(String(dateStr2))}`
  // );

  return differenceInDays(dateStr1, dateStr2);
};

export const formatDistanceFromNow = (dateStr) => {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
};

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

// If any property is empty, it returns true; otherwise, it returns false.
export function anyPropertyIsEmpty(obj) {
  for (let key in obj) {
    if (isEmpty(obj[key])) {
      return true;
    }
  }
  return false;
}

// Capitalized item
export const capitalizedItem = (item) =>
  item.charAt(0).toUpperCase() + item.slice(1);

// Format date
export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));

// Check if 1 or > properties are null ( If it completes the loop without finding any null values, it returns false, indicating that none of the properties are null.)
export const hasNullProperty = (obj) => {
  for (let key in obj) {
    if (obj[key] === null) return true;
  }
  return false;
};
