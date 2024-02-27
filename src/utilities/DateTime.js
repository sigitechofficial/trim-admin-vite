// @ts-nocheck
import dayjs from "dayjs";

export default function formatDateFromDB(dbDate) {
    const parsedDate = dayjs(dbDate);
    const formattedDate = parsedDate.format("DD/MM/YYYY h:mm:ss A");
    return formattedDate;
}



export function formateDate(dbDate) {
    const parsedDate = dayjs(dbDate);
    const formattedDate = parsedDate.format("DD/MM/YYYY");
    return formattedDate;
}


export function formatTimeFromDB(timeFromDB) {
    const timeWithoutDate = `1970-01-01T${timeFromDB}`;
    const parsedTime = dayjs(timeWithoutDate);
    const formattedTime = parsedTime.format('h:mm A');

    return formattedTime;
}


export function formateDateDayName(dbDate) {
    const parsedDate = dayjs(dbDate);
    const formattedDate = parsedDate.format("dddd, MMMM D, YYYY");
    return formattedDate;
}