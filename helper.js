exports.success = (message, data) => {
	return { message, data }
}

exports.getUniqueId = (array) =>{
	const arrayIds = array.map((item => item.id));
	const maxId = arrayIds.reduce((a,b) => Math.max(a, b));
	const uniqueId = maxId + 1
	return uniqueId;
}
