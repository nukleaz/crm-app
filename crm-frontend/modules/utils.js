export function formatDate(date) {
	return new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.');
}

export function formatTime(date) {
	return new Date(date).toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: 'numeric',
		hourCycle: 'h23',
	});
}
