/*
 * visitor.esm.js - VisitorLens Pro
 * =================================
 *
 * ES Module entry point.
 * Wraps the UMD build so it can be imported with native ES module syntax.
 *
 * Usage :
 *   import visitor from './visitor.esm.js';
 *   console.log( visitor.browser_name );
 *   visitor.onGeoReady( () => console.log( visitor.city ) );
 *
 * Usage with a bundler (Webpack, Vite, Rollup, Parcel) :
 *   import visitor from 'visitorlens-pro';
 *   (provided package.json "module" field points to this file)
 *
 */

/* Import the CommonJS/UMD build.
 * Bundlers resolve this to the full source.
 * In a browser ES module context the path is relative to this file. */
import visitorModule from './visitor.js';

/* Re-export the visitor object as the default export.
 * Named exports for destructuring are also provided as convenience.  */
export default visitorModule;

export var browser_name    = visitorModule.browser_name;
export var browser_version = visitorModule.browser_version;
export var os              = visitorModule.os;
export var device_type     = visitorModule.device_type;
export var country_name    = visitorModule.country_name;
export var city            = visitorModule.city;

/* Re-export utility methods as named exports. */
export var toJSON      = visitorModule.toJSON.bind( visitorModule );
export var debug       = visitorModule.debug.bind( visitorModule );
export var getCurrency = visitorModule.getCurrency.bind( visitorModule );
export var isMobile    = visitorModule.isMobile.bind( visitorModule );
export var getGreeting = visitorModule.getGreeting.bind( visitorModule );
export var onGeoReady  = visitorModule.onGeoReady.bind( visitorModule );
