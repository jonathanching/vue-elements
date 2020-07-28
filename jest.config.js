module.exports = {
	verbose: true,
	modulePathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/gh-pages/',
		'<rootDir>/node_modules/'
	],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
		'.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
	},
};