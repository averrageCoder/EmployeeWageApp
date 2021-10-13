const stringifyDate = (date) => {
    const options = {year: 'numeric', month: 'short', day: 'numeric'};
    const newDate = !date ? "undefined" : new Date(date).toLocaleString('en-US',options);
    return newDate;
}