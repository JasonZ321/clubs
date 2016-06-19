
export function getIdByURL(url, prefix) {
		let str = url.substr(url.lastIndexOf(prefix)+prefix.length);
		if (str.indexOf('/') < 0) {
			return str;
		} else {
			return str.substr(0, str.indexOf('/'));
		}
}
