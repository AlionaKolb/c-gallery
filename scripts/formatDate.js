"use strict";
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatDate(date) {

    let newDate = date.getDate();
    if (newDate < 10) {
        newDate = '0' + newDate
    };

    let newMonts = MONTHS[date.getMonth()];
    if (newMonts < 10) {
        newMonts = '0' + newMonts
    };

    let newYear = date.getFullYear();
    if (newYear < 10) {
        newYear = '0' + newYear
    };

    return `${newDate} ${newMonts} ${newYear}`;
}