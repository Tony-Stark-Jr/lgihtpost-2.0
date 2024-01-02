export default function formattedDate(utcTimestamp) {
	const now = new Date();
	const timestamp = new Date(utcTimestamp);
	const diffInSeconds = Math.floor((now - timestamp) / 1000);

	if (diffInSeconds < 60) {
		return 'just now';
	} if (diffInSeconds < 3600) {
		const minutes = Math.floor(diffInSeconds / 60);
		return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	} if (diffInSeconds < 86400) {
		const hours = Math.floor(diffInSeconds / 3600);
		return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	} if (diffInSeconds < 172800) {
		return 'yesterday';
	} 
		const days = Math.floor(diffInSeconds / 86400);
		return `${days} day${days > 1 ? 's' : ''} ago`;
	
}
