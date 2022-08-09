const formatDate = value => {
    // format MM - DD - YYYY from epoch seconds
    const date = new Date(value * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    // put 0 in front of single digit numbers
    const monthString = month < 10 ? `0${month}` : month;
    const dayString = day < 10 ? `0${day}` : day;

    return `${monthString} - ${dayString} - ${year}`;
};

export default formatDate;
