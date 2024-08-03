function formatDateTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);

    if (secondsAgo < 60) {
        return secondsAgo === 1 ? '1 second ago' : `${secondsAgo} seconds ago`;
    }
    else if (minutesAgo < 60) {
        return minutesAgo === 1 ? '1 minute ago' : `${minutesAgo} minutes ago`;
    }
    else if (hoursAgo < 24) {
        return hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`;
    }
    else if (daysAgo < 30) {
        return daysAgo === 1 ? '1 day ago' : `${daysAgo} days ago`;
    }
    else if (monthsAgo < 12) {
        return monthsAgo === 1 ? '1 month ago' : `${monthsAgo} months ago`;
    }
    else {
        return yearsAgo === 1 ? '1 year ago' : `${yearsAgo} years ago`;
    }
}

export default formatDateTime;
