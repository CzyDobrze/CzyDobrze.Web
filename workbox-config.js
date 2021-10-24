module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,svg,xml,ico,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};