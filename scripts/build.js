/*
 * scripts/build.js - VisitorLens Pro
 * ====================================
 *
 * Minification and distribution build script.
 * Run with : node scripts/build.js
 *
 * What it does :
 *   1. Reads src/main/visitor.js
 *   2. Minifies it with Terser (removes comments, shortens variable names)
 *   3. Prepends a one-line license banner to the minified output
 *   4. Writes dist/visitor.min.js
 *   5. Reports original size vs minified size
 *
 * Requirements :
 *   npm install  (installs terser listed in package.json devDependencies)
 *
 */

'use strict';

var fs      = require( 'fs' );   /* Node.js file system module  */
var path    = require( 'path' ); /* Node.js path utilities      */
var terser;                      /* Loaded below after checking */

/* ---- Paths ---- */
var ROOT_DIR   = path.join( __dirname, '..' );               /* Project root                */
var SRC_FILE   = path.join( ROOT_DIR, 'src/main/visitor.js' ); /* Source to minify          */
var DIST_DIR   = path.join( ROOT_DIR, 'dist' );              /* Output directory            */
var DIST_FILE  = path.join( DIST_DIR, 'visitor.min.js' );   /* Output minified file        */

/* ---- Banner prepended to the minified file ---- */
var BANNER =
    '/*! VisitorLens Pro v3.0.0 | MIT License | ' +
    'https://github.com/madjeek-web/visitorlens-pro | ' +
    '12/03/2026 Fabien Conejero */\n';

/* ---- Load Terser (must be installed via npm install) ---- */
try {
    terser = require( 'terser' );
} catch ( e ) {
    console.error( '[build] Terser not found. Run: npm install' );
    process.exit( 1 );
}

/* ---- Ensure dist/ directory exists ---- */
if ( ! fs.existsSync( DIST_DIR ) ) {
    fs.mkdirSync( DIST_DIR, { recursive: true } ); /* Create dir and any missing parents */
    console.log( '[build] Created dist/ directory' );
}

/* ---- Read source file ---- */
var source;
try {
    source = fs.readFileSync( SRC_FILE, 'utf8' ); /* Read the full source as UTF-8 */
} catch ( e ) {
    console.error( '[build] Cannot read source file : ' + SRC_FILE );
    process.exit( 1 );
}

var originalBytes = Buffer.byteLength( source, 'utf8' ); /* Size before minification */

/* ---- Terser minification options ---- */
var terserOptions = {
    compress : {
        drop_console : false,  /* Keep console.log calls (visitor.debug() needs them) */
        passes       : 2       /* Two compression passes for better size reduction     */
    },
    mangle : {
        /* Do NOT mangle the top-level visitor variable - it must stay "visitor"
           so the plain script-tag usage (window.visitor) still works. */
        reserved : [ 'visitor' ]
    },
    format : {
        comments : false  /* Strip all comments from the output */
    }
};

/* ---- Run minification (Terser 5.x returns a Promise) ---- */
terser.minify( source, terserOptions ).then( function ( result ) {

    if ( result.error ) {
        /* Terser found a syntax error in the source. */
        console.error( '[build] Minification error :' );
        console.error( result.error );
        process.exit( 1 );
    }

    /* Prepend the license banner so the minified file is still attributed. */
    var output      = BANNER + result.code;
    var minBytes    = Buffer.byteLength( output, 'utf8' ); /* Size after minification */
    var saving      = ( ( 1 - minBytes / originalBytes ) * 100 ).toFixed( 1 ); /* % saved */

    /* Write the minified output to dist/visitor.min.js */
    try {
        fs.writeFileSync( DIST_FILE, output, 'utf8' );
    } catch ( e ) {
        console.error( '[build] Cannot write output file : ' + DIST_FILE );
        process.exit( 1 );
    }

    /* Report the result. */
    console.log( '' );
    console.log( '[build] VisitorLens Pro - Build complete' );
    console.log( '  Source  : ' + SRC_FILE );
    console.log( '  Output  : ' + DIST_FILE );
    console.log( '  Before  : ' + ( originalBytes / 1024 ).toFixed( 1 ) + ' KB' );
    console.log( '  After   : ' + ( minBytes      / 1024 ).toFixed( 1 ) + ' KB' );
    console.log( '  Saving  : ' + saving + '%' );
    console.log( '' );

} ).catch( function ( err ) {
    /* Unexpected promise rejection. */
    console.error( '[build] Unexpected error during minification :' );
    console.error( err );
    process.exit( 1 );
} );
