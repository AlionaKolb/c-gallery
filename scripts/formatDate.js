const monts = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

export function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = monts[date.getMonth()];
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + ' ' + mm + ' ' + yy;
}

export function formatTime(time) {

    let dd = time.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = monts[time.getMonth()];
    if (mm < 10) mm = '0' + mm;

    let h = time.getHours();
    if (h < 10) h = '0' + h;

    let min = time.getMinutes();
    if (min < 10) min = '0' + min;

    return dd + ' ' + mm + ' ' + 'в' + ' ' + h + ':' + min;

}