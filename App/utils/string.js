export function cropLastWord(text){
	if (!text) {
		return ''
	}
	const x1 = text.split(' ')
	x1.splice(-1, 1)

	return x1.reduce(function(acc, val, i, arr){
		return acc + (i > 0 ? ' ' + val : val)
	}, '')
}
