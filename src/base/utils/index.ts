import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => moment(date).format("YYYY-MM-DD");

export const formatDateToIso = (date: { $d: Date }) => {
  const originDate = date.$d.toUTCString();
  return new Date(originDate).toISOString();
};

export const formatISODate = (date: string) => {
  const originalDate = moment(date);

  const formattedDate = originalDate.format("Do MMMM YYYY");
  return formattedDate;
};
