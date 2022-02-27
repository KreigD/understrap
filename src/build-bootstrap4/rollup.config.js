'use strict';

const path = require( 'path' );
const { babel } = require( '@rollup/plugin-babel' );
const { nodeResolve } = require( '@rollup/plugin-node-resolve' );
const multi = require( '@rollup/plugin-multi-entry' );
const banner = require( './banner.js' );

const fileDest = 'theme-bootstrap4.js';
const external = [ 'jquery' ];
const plugins = [
	babel( {
		browserslistEnv: 'bs4',
		// Include the helpers in the bundle, at most one copy of each
		babelHelpers: 'bundled',
	} ),
	nodeResolve(),
	multi(),
];
const globals = {
	jquery: 'jQuery', // Ensure we use jQuery which is always available even in noConflict mode
	'popper.js': 'Popper',
};

module.exports = {
	input: [
		path.resolve( __dirname, '../js/bootstrap4.js' ),
		path.resolve( __dirname, '../js/skip-link-focus-fix.js' ),
		path.resolve( __dirname, '../js/custom-javascript.js' ),
	],
	output: {
		banner,
		file: path.resolve( __dirname, `../../js/${ fileDest }` ),
		format: 'umd',
		globals,
		name: 'understrap',
	},
	external,
	plugins,
};
