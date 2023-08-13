/**
 * It returns the formatted date based on the date passed
 * If the date is of today, it returns the seconds, minutes or hours
 * If the date is of 1 month from today, it returns the days
 * If the date is of 1 year from today, it returns the months
 * If the date is of more than 1 year from today, it returns the years
 * @param date
 */
const getFormattedDate = (date: string) => {
	if (date === undefined || date === null) return '';

	const today = new Date();
	const commentDate = new Date(date);

	const diffTime = Math.abs(today.getTime() - commentDate.getTime());
	const oneDay = 24 * 60 * 60 * 1000;
	const diffDays = Math.floor(diffTime / oneDay);

	if (diffDays === 0) {
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		if (diffHours === 0) {
			const diffMinutes = Math.floor(diffTime / (1000 * 60));
			if (diffMinutes === 0) {
				const diffSeconds = Math.floor(diffTime / 1000);
				return `${diffSeconds} sec ago`;
			} else {
				return `${diffMinutes} min ago`;
			}
		} else {
			return `${diffHours} hours ago`;
		}
	} else if (diffDays === 1) {
		return `${diffDays} day ago`;
	} else if (diffDays < 30) {
		return `${diffDays} days ago`;
	} else if (diffDays < 365) {
		const diffMonths = Math.floor(diffDays / 30);
		if (diffMonths === 1) {
			return `${diffMonths} month ago`;
		} else {
			return `${diffMonths} months ago`;
		}
	} else {
		const diffYears = Math.floor(diffDays / 365);
		if (diffYears === 1) {
			return `${diffYears} year ago`;
		} else {
			return `${diffYears} years ago`;
		}
	}
};

export default getFormattedDate;

