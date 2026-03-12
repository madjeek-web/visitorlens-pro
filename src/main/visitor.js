/*
 *
 * visitor.js - VisitorLens Pro
 * ============================
 *
 * Version  : 3.0.0
 * Date     : 12 / 03 / 2026
 * Author   : Fabien Conejero ( https://github.com/madjeek-web )
 * License  : MIT
 *
 * A pure JavaScript API for comprehensive client-side visitor profiling.
 * No dependencies. No build step. No server required.
 * Compatible with plain script tags, CommonJS (Node / Webpack), and ES Modules.
 *
 * GeoIP chain (tried in order until one succeeds) :
 *   1. https://ipwho.is          free, HTTPS, no key, unlimited
 *   2. https://ipapi.co/json/    free, HTTPS, no key, 1 000 req/day
 *   3. https://ipinfo.io/json    free, HTTPS, no key, 50 000 req/month
 *   4. https://freeipapi.com/... free, HTTPS, no key, 60 req/min
 *
 * WARNING - GeoIP fallback limits :
 *   ipapi.co  caps free usage at 1 000 requests per day.
 *   ipinfo.io caps free usage at 50 000 requests per month.
 *   freeipapi.com caps free usage at 60 requests per minute.
 *   For high-traffic sites, consider self-hosting a GeoIP database
 *   such as the free MaxMind GeoLite2 ( https://dev.maxmind.com/geoip/ ).
 *
 * Usage (plain HTML) :
 *   <script src="visitor.min.js"></script>
 *   <script>
 *       console.log( visitor.city );
 *       visitor.onGeoReady( function () { console.log( visitor.getCurrency() ); } );
 *   </script>
 *
 * Usage (CDN via jsDelivr) :
 *   <script src="https://cdn.jsdelivr.net/gh/madjeek-web/visitorlens-pro@latest/dist/visitor.min.js"></script>
 *
 * Usage (ES Module) :
 *   import visitor from './visitor.esm.js';
 *
 * Usage (CommonJS / Node / Jest) :
 *   var visitor = require('./visitor.js');
 *
 */


/* ============================================================================
 * Global visitor object.
 * Declared outside the IIFE so it is reachable from every script on the page.
 * Also exported via CommonJS and AMD at the bottom of this file.
 * ============================================================================ */
var visitor = {};


( function ( root, factory ) {

    /* Universal Module Definition (UMD) wrapper.
     * This pattern makes the same file work as a plain script tag,
     * as a CommonJS module (require), and as an AMD module (RequireJS).
     * The ES Module version lives in the separate visitor.esm.js file. */

    if ( typeof define === 'function' && define.amd ) {

        /* AMD environment (RequireJS). define() registers the factory. */
        define( [], factory );

    } else if ( typeof module !== 'undefined' && module.exports ) {

        /* CommonJS environment (Node.js, Jest, Webpack, Browserify).
         * module.exports receives the visitor object returned by factory(). */
        module.exports = factory();

    } else {

        /* Plain browser script tag.
         * Assign to the global visitor variable declared above. */
        root.visitor = factory();
    }

} ( typeof globalThis !== 'undefined' ? globalThis : /* modern standard   */
    typeof window    !== 'undefined' ? window    : /* browser            */
    typeof global    !== 'undefined' ? global    : /* Node.js            */
    this,                                           /* last resort        */

function () {

    /* =========================================================================
     *
     * PART 1 - BROWSER DETECTION
     *
     * Identifies browser name, version, and rendering engine.
     * Coverage : Internet Explorer 6 through every major browser in 2026.
     *
     * Ordering rule :
     *   Check the most specific UA tokens FIRST because many browsers contain
     *   each other's keywords (e.g. Chrome UA also contains "Safari",
     *   Edge UA also contains "Chrome").
     *
     * ========================================================================= */

    var BrowserDetect = {

        /* Populate name, version, engine, and OS in one call. */
        init : function () {
            this.name    = this.detectName();
            this.version = this.detectVersion();
            this.engine  = this.detectEngine();
            this.OS      = this.detectOS();
        },

        /* ------------------------------------------------------------------
         * detectName - returns a clean browser name string.
         * ------------------------------------------------------------------ */
        detectName : function () {

            var ua  = navigator.userAgent;
            var vnd = navigator.vendor || '';

            /* Brave exposes navigator.brave. Check first - its UA is identical to Chrome. */
            if ( navigator.brave && typeof navigator.brave.isBrave === 'function' ) {
                return 'Brave';
            }

            /* Samsung Internet identifies itself before the Chrome token. */
            if ( ua.indexOf( 'SamsungBrowser' ) !== -1 ) { return 'Samsung Internet'; }

            /* UC Browser appears before Chrome in its UA. */
            if ( ua.indexOf( 'UCBrowser' )      !== -1 ) { return 'UC Browser'; }

            /* Yandex Browser wraps Chromium but prefixes with YaBrowser. */
            if ( ua.indexOf( 'YaBrowser' )      !== -1 ) { return 'Yandex Browser'; }

            /* Vivaldi is a Chromium fork that adds "Vivaldi/" to the UA. */
            if ( ua.indexOf( 'Vivaldi' )         !== -1 ) { return 'Vivaldi'; }

            /* Opera modern (2013+) uses "OPR" token in its Chromium UA. */
            if ( ua.indexOf( 'OPR' )             !== -1 ) { return 'Opera'; }

            /* Opera classic (pre-2013 Presto engine). */
            if ( ua.indexOf( 'Opera' )           !== -1 ) { return 'Opera'; }

            /* Edge Chromium (2020+). "Edg/" without trailing 'e'.
               Mobile variants use "EdgA/" (Android) and "EdgiOS/" (iOS). */
            if ( ua.indexOf( 'Edg/'   ) !== -1 ||
                 ua.indexOf( 'EdgA/'  ) !== -1 ||
                 ua.indexOf( 'EdgiOS' ) !== -1 )           { return 'Edge'; }

            /* Edge Legacy (EdgeHTML engine, 2015-2019). Uses "Edge/" with 'e'. */
            if ( ua.indexOf( 'Edge' )            !== -1 ) { return 'Edge Legacy'; }

            /* Internet Explorer 11. Dropped "MSIE", uses "Trident/7.0; rv:". */
            if ( ua.indexOf( 'Trident' )         !== -1 ) { return 'Internet Explorer'; }

            /* Internet Explorer 6-10. All use "MSIE X.Y" token. */
            if ( ua.indexOf( 'MSIE' )            !== -1 ) { return 'Internet Explorer'; }

            /* Firefox before the generic Mozilla fallback. */
            if ( ua.indexOf( 'Firefox' )         !== -1 ) { return 'Firefox'; }

            /* Waterfox - privacy-focused Firefox fork. */
            if ( ua.indexOf( 'Waterfox' )        !== -1 ) { return 'Waterfox'; }

            /* Pale Moon - Goanna engine fork of Firefox. */
            if ( ua.indexOf( 'PaleMoon' )        !== -1 ) { return 'Pale Moon'; }

            /* Chrome - must come after Edge, Opera, Samsung, Brave (all include "Chrome"). */
            if ( ua.indexOf( 'Chrome' )          !== -1 ) { return 'Chrome'; }

            /* Safari - check vendor too because Chrome UA also contains "Safari". */
            if ( ua.indexOf( 'Safari' ) !== -1 && vnd.indexOf( 'Apple' ) !== -1 ) {
                return 'Safari';
            }

            if ( ua.indexOf( 'OmniWeb' )         !== -1 ) { return 'OmniWeb'; }
            if ( vnd.indexOf( 'KDE' )            !== -1 ) { return 'Konqueror'; }
            if ( vnd.indexOf( 'Camino' )         !== -1 ) { return 'Camino'; }
            if ( ua.indexOf( 'Netscape' )        !== -1 ) { return 'Netscape'; }
            if ( ua.indexOf( 'Gecko' )           !== -1 ) { return 'Mozilla / Gecko'; }

            return 'Unknown Browser';
        },

        /* ------------------------------------------------------------------
         * detectVersion - returns the browser version string.
         * ------------------------------------------------------------------ */
        detectVersion : function () {

            var ua   = navigator.userAgent;
            var name = this.name;

            var patterns = {
                'Brave'            : /Brave\/([\d.]+)/,
                'Samsung Internet' : /SamsungBrowser\/([\d.]+)/,
                'UC Browser'       : /UCBrowser\/([\d.]+)/,
                'Yandex Browser'   : /YaBrowser\/([\d.]+)/,
                'Opera'            : /(?:OPR|Opera)[\/ ]([\d.]+)/,
                'Vivaldi'          : /Vivaldi\/([\d.]+)/,
                'Edge'             : /Edg[Ai]?OS?\/([\d.]+)/,
                'Edge Legacy'      : /Edge\/([\d.]+)/,
                'Internet Explorer': /(?:MSIE |rv:)([\d.]+)/,
                'Firefox'          : /Firefox\/([\d.]+)/,
                'Waterfox'         : /Waterfox\/([\d.]+)/,
                'Pale Moon'        : /PaleMoon\/([\d.]+)/,
                'Chrome'           : /Chrome\/([\d.]+)/,
                'Safari'           : /Version\/([\d.]+)/,
                'Netscape'         : /Netscape\/([\d.]+)/
            };

            if ( patterns[ name ] ) {
                var m = ua.match( patterns[ name ] ); /* Apply regex to UA string */
                if ( m && m[1] ) { return m[1]; }     /* Return first capture group */
            }

            var fallback = ua.match( /([\d]+\.[\d.]+)/ ); /* Generic version number */
            return fallback ? fallback[1] : 'Unknown';
        },

        /* ------------------------------------------------------------------
         * detectEngine - returns the rendering engine name.
         * ------------------------------------------------------------------ */
        detectEngine : function () {

            var ua = navigator.userAgent;

            if ( ua.indexOf( 'Trident'  ) !== -1 ) { return 'Trident';  } /* IE all versions */
            if ( ua.indexOf( 'EdgeHTML' ) !== -1 ) { return 'EdgeHTML'; } /* Edge 2015-2019  */
            if ( ua.indexOf( 'Blink'    ) !== -1 ) { return 'Blink';    } /* Chrome, Edge 2020+ */
            if ( ua.indexOf( 'Gecko'    ) !== -1 ) { return 'Gecko';    } /* Firefox         */
            if ( ua.indexOf( 'WebKit'   ) !== -1 ) { return 'WebKit';   } /* Safari          */
            if ( ua.indexOf( 'Presto'   ) !== -1 ) { return 'Presto';   } /* Opera <= 12     */
            if ( navigator.product === 'Gecko'    ) { return 'Gecko';   } /* Gecko fallback  */

            return 'Unknown Engine';
        },

        /* ------------------------------------------------------------------
         * detectOS - returns the operating system name.
         * Mobile tokens must come before desktop ones (Android UA includes Linux).
         * ------------------------------------------------------------------ */
        detectOS : function () {

            var ua   = navigator.userAgent;
            var plat = navigator.platform;

            /* --- Mobile first --- */
            if ( ua.indexOf( 'iPhone' ) !== -1 || ua.indexOf( 'iPod' ) !== -1 ) { return 'iOS'; }
            if ( ua.indexOf( 'iPad'   ) !== -1 ) { return 'iPadOS'; }
            if ( ua.indexOf( 'Android'       ) !== -1 ) { return 'Android'; }
            if ( ua.indexOf( 'Windows Phone' ) !== -1 ) { return 'Windows Phone'; }
            if ( ua.indexOf( 'BlackBerry'    ) !== -1 ) { return 'BlackBerry'; }
            if ( ua.indexOf( 'Symbian'       ) !== -1 ) { return 'Symbian'; }

            /* --- Desktop --- */
            if ( ua.indexOf( 'CrOS' ) !== -1 ) { return 'Chrome OS'; }

            if ( plat.indexOf( 'Win' ) !== -1 ) {
                if ( ua.indexOf( 'Windows NT 11'  ) !== -1 ) { return 'Windows 11'; }
                if ( ua.indexOf( 'Windows NT 10'  ) !== -1 ) { return 'Windows 10 / 11'; }
                if ( ua.indexOf( 'Windows NT 6.3' ) !== -1 ) { return 'Windows 8.1'; }
                if ( ua.indexOf( 'Windows NT 6.2' ) !== -1 ) { return 'Windows 8'; }
                if ( ua.indexOf( 'Windows NT 6.1' ) !== -1 ) { return 'Windows 7'; }
                if ( ua.indexOf( 'Windows NT 6.0' ) !== -1 ) { return 'Windows Vista'; }
                if ( ua.indexOf( 'Windows NT 5.2' ) !== -1 ) { return 'Windows Server 2003'; }
                if ( ua.indexOf( 'Windows NT 5.1' ) !== -1 ) { return 'Windows XP'; }
                if ( ua.indexOf( 'Windows NT 5.0' ) !== -1 ) { return 'Windows 2000'; }
                if ( ua.indexOf( 'Windows NT 4.0' ) !== -1 ) { return 'Windows NT 4'; }
                return 'Windows';
            }

            if ( plat.indexOf( 'Mac'   ) !== -1 && ua.indexOf( 'Mobile' ) === -1 ) { return 'macOS'; }
            if ( plat.indexOf( 'Linux' ) !== -1 ) { return 'Linux'; }
            if ( ua.indexOf( 'FreeBSD' ) !== -1 ) { return 'FreeBSD'; }

            return 'Unknown OS';
        }

    }; /* end BrowserDetect */

    BrowserDetect.init(); /* Run detection once at startup */


    /* =========================================================================
     *
     * PART 2 - DEVICE DETECTION
     *
     * ========================================================================= */

    var DeviceDetect = {

        getType : function () {
            var ua = navigator.userAgent;
            if ( /Mobi|Android.*Mobile|iPhone|iPod|BlackBerry|Windows Phone/i.test( ua ) ) { return 'Mobile'; }
            if ( /iPad|Tablet|PlayBook/i.test( ua ) )                                       { return 'Tablet'; }
            if ( /Android/i.test( ua ) && ! /Mobile/i.test( ua ) )                         { return 'Tablet'; }
            return 'Desktop';
        },

        getCPUCores      : function () { return navigator.hardwareConcurrency || 'N/A'; },
        getDeviceMemory  : function () { return navigator.deviceMemory        || 'N/A'; },

        getMaxTouchPoints : function () {
            return navigator.maxTouchPoints || navigator.msMaxTouchPoints || 0;
        },

        hasTouchSupport : function () {
            return (
                ( 'ontouchstart' in window )       ||
                ( navigator.maxTouchPoints   > 0 ) ||
                ( navigator.msMaxTouchPoints > 0 )
            );
        },

        getPixelRatio : function () { return window.devicePixelRatio || 1; }

    }; /* end DeviceDetect */


    /* =========================================================================
     *
     * PART 3 - SCREEN & DISPLAY
     *
     * ========================================================================= */

    var ScreenDetect = {

        getResolution : function () { return screen.width + 'x' + screen.height; },

        getViewportWidth : function () {
            return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
        },

        getViewportHeight : function () {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
        },

        getColorDepth : function () { return screen.colorDepth || screen.pixelDepth || 'N/A'; },

        prefersDarkMode : function () {
            return window.matchMedia ? window.matchMedia( '(prefers-color-scheme: dark)' ).matches : null;
        },

        prefersReducedMotion : function () {
            return window.matchMedia ? window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches : null;
        },

        prefersHighContrast : function () {
            return window.matchMedia ? window.matchMedia( '(prefers-contrast: more)' ).matches : null;
        }

    }; /* end ScreenDetect */


    /* =========================================================================
     *
     * PART 4 - NETWORK & PERFORMANCE
     *
     * ========================================================================= */

    var NetworkDetect = {

        getConnectionType : function () {
            var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            return conn ? ( conn.effectiveType || conn.type || 'N/A' ) : 'N/A';
        },

        getDownlink : function () {
            var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            return ( conn && conn.downlink !== undefined ) ? conn.downlink + ' Mbps' : 'N/A';
        },

        isOnline : function () { return navigator.onLine; },

        getPageLoadTime : function () {
            if ( window.performance && window.performance.timing ) {
                var t  = window.performance.timing;
                var ms = t.loadEventEnd - t.navigationStart;
                return ms > 0 ? ms + ' ms' : 'loading';
            }
            return 'N/A';
        },

        getDNSLookupTime : function () {
            if ( window.performance && window.performance.timing ) {
                var t  = window.performance.timing;
                var ms = t.domainLookupEnd - t.domainLookupStart;
                return ms >= 0 ? ms + ' ms' : 'N/A';
            }
            return 'N/A';
        }

    }; /* end NetworkDetect */


    /* =========================================================================
     *
     * PART 5 - PRIVACY & STORAGE FLAGS
     *
     * ========================================================================= */

    var PrivacyDetect = {

        getDoNotTrack : function () {
            return navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack || null;
        },

        areCookiesEnabled : function () {
            document.cookie = '_vl_test=1; SameSite=Strict';
            var ok = document.cookie.indexOf( '_vl_test' ) !== -1;
            document.cookie = '_vl_test=; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
            return ok;
        },

        isLocalStorageAvailable : function () {
            try {
                localStorage.setItem( '_vl_test', '1' );
                localStorage.removeItem( '_vl_test' );
                return true;
            } catch ( e ) { return false; }
        },

        isSessionStorageAvailable : function () {
            try {
                sessionStorage.setItem( '_vl_test', '1' );
                sessionStorage.removeItem( '_vl_test' );
                return true;
            } catch ( e ) { return false; }
        },

        /* ------------------------------------------------------------------
         * detectAdBlocker - improved multi-technique approach.
         *
         * FIX (vs VisitorLens) :
         *   The original single-bait technique is known to ad-blocker devs and
         *   is bypassed by uBlock Origin in strict mode.
         *   We now combine three independent techniques and return true only
         *   when at least two of them agree, reducing false positives and
         *   making it harder for a single countermeasure to defeat us.
         *
         * Technique A : DOM bait element with multiple class names that target
         *               different filter lists (EasyList, uBlock, AdGuard).
         * Technique B : Check for known ad-blocker globals injected into window
         *               by some extensions (uBO, Ghostery, AdBlock Plus).
         * Technique C : Check if a known ad-network domain can be fetched.
         *               A blocked domain causes the fetch to fail immediately.
         *               This only runs in browsers that support fetch() and
         *               falls back gracefully in IE.
         *
         * The callback receives a boolean : true = ad blocker active.
         * ------------------------------------------------------------------ */
        detectAdBlocker : function ( callback ) {

            if ( typeof callback !== 'function' ) { return; } /* Defensive check */

            var votes = 0;         /* Count of techniques that say "blocked" */
            var done  = 0;         /* Count of techniques that have reported back */
            var total = 3;         /* Total number of techniques we are running */

            /* When all techniques have voted, deliver the result. */
            var tally = function ( blocked ) {
                if ( blocked ) { votes++; }   /* Increment blocked count */
                done++;                        /* Increment completion count */
                if ( done === total ) {
                    callback( votes >= 2 );    /* Majority vote : 2 out of 3 = blocked */
                }
            };

            /* --- Technique A : DOM bait (improved class list) --- */
            var bait = document.createElement( 'div' );
            bait.setAttribute( 'class',
                /* EasyList targets */        'ad_unit ads advertisement adsbox ' +
                /* uBlock Origin targets */   'doubleclick adsbygoogle banner_ad ' +
                /* AdGuard targets */         'ad-placement sponsored-content native-ad'
            );
            bait.setAttribute( 'style',
                'position:absolute;width:1px;height:1px;top:-9999px;left:-9999px;'
            );

            /* The element must be in the DOM before blockers act on it. */
            if ( document.body ) {
                document.body.appendChild( bait );
            }

            setTimeout( function () {
                var blocked = (
                    bait.offsetParent === null ||
                    bait.offsetHeight === 0    ||
                    bait.offsetWidth  === 0    ||
                    bait.style.display === 'none'
                );
                if ( document.body && bait.parentNode ) {
                    document.body.removeChild( bait ); /* Always clean up */
                }
                tally( blocked );
            }, 150 ); /* Give blockers 150ms to act - more than original 100ms */

            /* --- Technique B : Known ad-blocker window globals --- */
            /* Some extensions expose themselves via window properties.
               We check a list of known identifiers. This is passive and instant. */
            setTimeout( function () {
                var knownGlobals = [
                    'uBlockOrigin', 'ublock', '__ubo',     /* uBlock Origin      */
                    'adblock',      'AdBlock',              /* AdBlock            */
                    'ab',                                   /* AdBlock Plus short */
                    '_phantom',     '__adblockplus',        /* AdBlock Plus       */
                    'ghostery',                             /* Ghostery           */
                    'AdGuardWorker', '__adguard'            /* AdGuard            */
                ];
                var found = false;
                var i;
                for ( i = 0; i < knownGlobals.length; i++ ) {
                    if ( typeof window[ knownGlobals[ i ] ] !== 'undefined' ) {
                        found = true; /* Extension revealed itself */
                        break;
                    }
                }
                tally( found );
            }, 0 ); /* No wait needed - this is synchronous */

            /* --- Technique C : Fetch probe to a known ad-network URL --- */
            /* Ad blockers intercept and abort requests to ad-network domains.
               We probe a pixel endpoint. A blocked request throws immediately.
               This technique only works in browsers that have fetch() (not IE8-11).
               We use a no-cors request so CORS headers are not required. */
            if ( typeof fetch !== 'undefined' ) {
                fetch(
                    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    { mode: 'no-cors', cache: 'no-store' }
                ).then( function () {
                    tally( false ); /* Request succeeded = no blocker on this domain */
                } ).catch( function () {
                    tally( true );  /* Request failed = likely blocked */
                } );
            } else {
                /* fetch not available (IE8-11) - skip this technique, count it as "no vote". */
                total--;                           /* Reduce expected total */
                if ( done === total && total > 0 ) {
                    callback( votes >= 1 );        /* Majority with 2 techniques = 1 of 2 */
                }
            }
        }

    }; /* end PrivacyDetect */


    /* =========================================================================
     *
     * PART 6 - BROWSER CAPABILITIES
     *
     * ========================================================================= */

    var CapabilityDetect = {

        hasWebGL : function () {
            try {
                var c = document.createElement( 'canvas' );
                return !! ( c.getContext( 'webgl' ) || c.getContext( 'experimental-webgl' ) );
            } catch ( e ) { return false; }
        },

        getGPURenderer : function () {
            try {
                var c  = document.createElement( 'canvas' );
                var gl = c.getContext( 'webgl' ) || c.getContext( 'experimental-webgl' );
                if ( ! gl ) { return 'N/A'; }
                var info = gl.getExtension( 'WEBGL_debug_renderer_info' );
                if ( ! info ) { return 'N/A'; }
                return gl.getParameter( info.UNMASKED_RENDERER_WEBGL ) || 'N/A';
            } catch ( e ) { return 'N/A'; }
        },

        hasCanvas       : function () { var c = document.createElement( 'canvas' ); return !! ( c.getContext && c.getContext( '2d' ) ); },
        hasServiceWorker: function () { return 'serviceWorker' in navigator; },
        hasNotifications: function () { return 'Notification' in window; },
        hasGeolocation  : function () { return 'geolocation' in navigator; },
        hasClipboardAPI : function () { return 'clipboard' in navigator; },
        hasWebBluetooth : function () { return 'bluetooth' in navigator; },
        hasWebRTC       : function () { return !! ( window.RTCPeerConnection || window.webkitRTCPeerConnection ); },
        hasIntl         : function () { return typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function'; }

    }; /* end CapabilityDetect */


    /* =========================================================================
     *
     * PART 7 - COOKIE HELPERS
     *
     * ========================================================================= */

    var setCookie = function ( name, value, days, path, domain, secure ) {
        var now    = new Date();
        var expiry = null;
        if ( days ) {
            expiry = new Date( now.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        }
        document.cookie =
            name + '=' + encodeURIComponent( value )                         +
            ( expiry ? '; expires=' + expiry.toUTCString() : '' )            +
            ( path   ? '; path='   + path   : '' )                           +
            ( domain ? '; domain=' + domain : '' )                           +
            '; SameSite=Lax'                                                  +
            ( secure ? '; Secure' : '' );
    };

    var getCookie = function ( name ) {
        var all  = document.cookie.split( ';' );
        var i, pair, key, val;
        for ( i = 0; i < all.length; i++ ) {
            pair = all[ i ].split( '=' );
            key  = pair[ 0 ].replace( /^\s+|\s+$/g, '' );
            if ( key === name ) {
                val = pair.slice( 1 ).join( '=' ).replace( /^\s+|\s+$/g, '' );
                return decodeURIComponent( val );
            }
        }
        return null;
    };


    /* =========================================================================
     *
     * PART 8 - SESSION MANAGEMENT
     *
     * ========================================================================= */

    var loadVisitorSession = function () {

        var COOKIE_NAME = 'visitorlens';
        var COOKIE_DAYS = 3650;
        var SEP         = '__';

        var raw = getCookie( COOKIE_NAME );

        if ( raw ) {
            var parts  = raw.split( SEP );
            var count  = parseInt( parts[0], 10 );
            var first  = parts[1] || '';
            setCookie( COOKIE_NAME, ( count + 1 ) + SEP + first, COOKIE_DAYS, '/', '', '' );
            visitor.count          = count + 1;
            visitor.first_visit_on = first;
            visitor.is_returning   = true;
        } else {
            var now = new Date().toISOString();
            setCookie( COOKIE_NAME, '1' + SEP + now, COOKIE_DAYS, '/', '', '' );
            visitor.count          = 1;
            visitor.first_visit_on = now;
            visitor.is_returning   = false;
        }

        visitor.current_visit_on = new Date().toISOString();
        visitor.timezone_offset  = new Date().getTimezoneOffset();
        visitor.timezone         = CapabilityDetect.hasIntl()
            ? Intl.DateTimeFormat().resolvedOptions().timeZone
            : 'N/A';
    };


    /* =========================================================================
     *
     * PART 9 - SYNCHRONOUS DATA ASSEMBLY
     *
     * ========================================================================= */

    var assembleSyncData = function () {

        /* ---- Browser ---- */
        visitor.browser_name    = BrowserDetect.name;
        visitor.browser_version = BrowserDetect.version;
        visitor.browser_engine  = BrowserDetect.engine;
        visitor.os              = BrowserDetect.OS;
        visitor.user_agent      = navigator.userAgent;
        visitor.language        = navigator.language || navigator.userLanguage || 'N/A';
        visitor.languages       = navigator.languages
            ? Array.prototype.join.call( navigator.languages, ', ' )
            : ( visitor.language );

        /* ---- Device ---- */
        visitor.device_type      = DeviceDetect.getType();
        visitor.cpu_cores        = DeviceDetect.getCPUCores();
        visitor.device_memory_gb = DeviceDetect.getDeviceMemory();
        visitor.max_touch_points = DeviceDetect.getMaxTouchPoints();
        visitor.touch_support    = DeviceDetect.hasTouchSupport();
        visitor.pixel_ratio      = DeviceDetect.getPixelRatio();

        /* ---- Screen ---- */
        visitor.screen_resolution       = ScreenDetect.getResolution();
        visitor.screen_width            = screen.width;
        visitor.screen_height           = screen.height;
        visitor.viewport_width          = ScreenDetect.getViewportWidth();
        visitor.viewport_height         = ScreenDetect.getViewportHeight();
        visitor.color_depth             = ScreenDetect.getColorDepth();
        visitor.prefers_dark            = ScreenDetect.prefersDarkMode();
        visitor.prefers_reduced_motion  = ScreenDetect.prefersReducedMotion();
        visitor.prefers_high_contrast   = ScreenDetect.prefersHighContrast();

        /* ---- Page ---- */
        visitor.url        = window.location.href;
        visitor.referrer   = document.referrer || '';
        visitor.page_title = document.title    || '';

        /* ---- Network ---- */
        visitor.connection_type = NetworkDetect.getConnectionType();
        visitor.downlink        = NetworkDetect.getDownlink();
        visitor.is_online       = NetworkDetect.isOnline();
        visitor.page_load_time  = NetworkDetect.getPageLoadTime();
        visitor.dns_lookup_time = NetworkDetect.getDNSLookupTime();

        /* ---- Privacy ---- */
        visitor.do_not_track              = PrivacyDetect.getDoNotTrack();
        visitor.cookies_enabled           = PrivacyDetect.areCookiesEnabled();
        visitor.local_storage_available   = PrivacyDetect.isLocalStorageAvailable();
        visitor.session_storage_available = PrivacyDetect.isSessionStorageAvailable();

        /* Ad blocker result starts null and resolves ~150ms later. */
        visitor.ad_blocker_detected = null;
        PrivacyDetect.detectAdBlocker( function ( detected ) {
            visitor.ad_blocker_detected = detected;
        } );

        /* ---- Capabilities ---- */
        visitor.has_webgl          = CapabilityDetect.hasWebGL();
        visitor.gpu_renderer       = CapabilityDetect.getGPURenderer();
        visitor.has_canvas         = CapabilityDetect.hasCanvas();
        visitor.has_service_worker = CapabilityDetect.hasServiceWorker();
        visitor.has_notifications  = CapabilityDetect.hasNotifications();
        visitor.has_geolocation    = CapabilityDetect.hasGeolocation();
        visitor.has_clipboard_api  = CapabilityDetect.hasClipboardAPI();
        visitor.has_web_bluetooth  = CapabilityDetect.hasWebBluetooth();
        visitor.has_webrtc         = CapabilityDetect.hasWebRTC();
        visitor.has_intl           = CapabilityDetect.hasIntl();

        /* ---- Session ---- */
        loadVisitorSession();

        /* ---- Geo placeholders ---- */
        visitor.geo_loaded   = false;    /* Becomes true when the GeoIP chain resolves */
        visitor.geo_source   = 'none';   /* Tracks which API finally delivered the data */
        visitor.ip           = 'pending';
        visitor.country_code = 'pending';
        visitor.country_name = 'pending';
        visitor.city         = 'pending';
        visitor.region       = 'pending';
        visitor.region_name  = 'pending';
        visitor.latitude     = 'pending';
        visitor.longitude    = 'pending';
        visitor.postal_code  = 'pending';
        visitor.isp          = 'pending';
    };


    /* =========================================================================
     *
     * PART 10 - GEO DATA (asynchronous, 4-level fallback chain)
     *
     * FIX (vs VisitorLens) :
     *   VisitorLens had 2 GeoIP services (1 primary + 1 fallback).
     *   VisitorLens-Pro has 4 services tried in sequence.
     *   Each failure (network error, timeout, bad JSON, API error flag)
     *   automatically triggers the next service in the chain.
     *   visitor.geo_source records which service finally delivered the data.
     *
     * Rate limits (documented here AND in the README - FIX vs VisitorLens) :
     *
     *   Service 1 : ipwho.is
     *     Limit   : Unlimited on the free tier as of 2026.
     *     HTTPS   : Yes
     *     Key     : None required
     *
     *   Service 2 : ipapi.co
     *     Limit   : 1 000 requests per day on the free tier.
     *     HTTPS   : Yes
     *     Key     : None required
     *     NOTE    : This limit will be hit by any site with moderate traffic.
     *               If your site receives more than 1 000 visitors per day,
     *               treat this as an emergency fallback only.
     *
     *   Service 3 : ipinfo.io
     *     Limit   : 50 000 requests per month on the free tier (~1 666/day).
     *     HTTPS   : Yes
     *     Key     : None required for the anonymous endpoint
     *
     *   Service 4 : freeipapi.com
     *     Limit   : 60 requests per minute on the free tier.
     *     HTTPS   : Yes
     *     Key     : None required
     *
     *   For sites exceeding these limits, self-host a GeoLite2 database :
     *   https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
     *
     * ========================================================================= */

    /* Internal helper : make one XHR GET request.
     * url      : endpoint to call.
     * timeout  : milliseconds before giving up.
     * onOK     : callback( responseText ) when status === 200.
     * onFail   : callback() on any error (HTTP error, network error, timeout). */
    var xhrGet = function ( url, timeout, onOK, onFail ) {

        var xhr = new XMLHttpRequest(); /* Compatible IE8+ and all modern browsers */
        xhr.open( 'GET', url, true );   /* true = asynchronous                     */
        xhr.timeout = timeout;          /* Maximum wait in milliseconds            */

        xhr.onreadystatechange = function () {
            if ( xhr.readyState !== 4 ) { return; } /* 4 = request is complete */
            if ( xhr.status === 200 ) {
                onOK( xhr.responseText ); /* Success : deliver body to caller */
            } else {
                onFail();                 /* HTTP error : trigger fallback     */
            }
        };

        xhr.onerror   = function () { onFail(); }; /* Network-level failure */
        xhr.ontimeout = function () { onFail(); }; /* Timeout exceeded      */
        xhr.send();                                /* Fire the request      */
    };


    /* Write a set of geo fields from a normalized data object.
     * Each caller normalizes its API response into this common shape. */
    var applyGeoData = function ( d ) {

        visitor.ip               = d.ip               || 'N/A';
        visitor.ip_type          = d.ip_type          || 'N/A';
        visitor.country_code     = d.country_code     || 'N/A';
        visitor.country_name     = d.country_name     || 'N/A';
        visitor.continent        = d.continent        || 'N/A';
        visitor.capital          = d.capital          || 'N/A';
        visitor.calling_code     = d.calling_code     || 'N/A';
        visitor.region           = d.region           || 'N/A';
        visitor.region_name      = d.region_name      || 'N/A';
        visitor.city             = d.city             || 'N/A';
        visitor.postal_code      = d.postal_code      || 'N/A';
        visitor.latitude         = d.latitude         || 'N/A';
        visitor.longitude        = d.longitude        || 'N/A';
        visitor.isp              = d.isp              || 'N/A';
        visitor.org              = d.org              || 'N/A';
        visitor.asn              = d.asn              || 'N/A';
        visitor.geo_timezone     = d.geo_timezone     || 'N/A';
        visitor.geo_timezone_utc = d.geo_timezone_utc || 'N/A';
        visitor.geo_current_time = d.geo_current_time || 'N/A';
        visitor.is_dst           = d.is_dst           || false;
        visitor.currency         = d.currency         || 'N/A';

        visitor.geo_loaded = true; /* Signal that geo data is now available */
    };


    /* ---- Service 1 : ipwho.is ---- */
    var tryIpwhoIs = function ( onFail ) {
        xhrGet( 'https://ipwho.is/', 8000,
            function ( text ) {
                var data;
                try { data = JSON.parse( text ); } catch ( e ) { onFail(); return; }
                if ( ! data || data.success === false ) { onFail(); return; }

                /* Normalize ipwho.is response fields to the common shape. */
                applyGeoData( {
                    ip               : data.ip,
                    ip_type          : data.type,
                    country_code     : data.country_code,
                    country_name     : data.country,
                    continent        : data.continent,
                    capital          : data.capital,
                    calling_code     : data.calling_code,
                    region           : data.region_code,
                    region_name      : data.region,
                    city             : data.city,
                    postal_code      : data.postal,
                    latitude         : data.latitude,
                    longitude        : data.longitude,
                    isp              : data.connection ? data.connection.isp    : '',
                    org              : data.connection ? data.connection.org    : '',
                    asn              : data.connection ? data.connection.asn    : '',
                    geo_timezone     : data.timezone   ? data.timezone.id       : '',
                    geo_timezone_utc : data.timezone   ? data.timezone.utc      : '',
                    geo_current_time : data.timezone   ? data.timezone.current_time : '',
                    is_dst           : data.timezone   ? !! data.timezone.is_dst : false
                } );

                visitor.geo_source = 'ipwho.is'; /* Record which service responded */
            },
            onFail
        );
    };


    /* ---- Service 2 : ipapi.co ----
     * WARNING : free tier is capped at 1 000 requests per day.
     * See the rate-limit documentation at the top of Part 10. */
    var tryIpapiCo = function ( onFail ) {
        xhrGet( 'https://ipapi.co/json/', 8000,
            function ( text ) {
                var data;
                try { data = JSON.parse( text ); } catch ( e ) { onFail(); return; }
                if ( ! data || data.error ) { onFail(); return; }

                applyGeoData( {
                    ip           : data.ip,
                    ip_type      : data.version,
                    country_code : data.country_code,
                    country_name : data.country_name,
                    continent    : data.continent_code,
                    calling_code : data.country_calling_code,
                    region       : data.region_code,
                    region_name  : data.region,
                    city         : data.city,
                    postal_code  : data.postal,
                    latitude     : data.latitude,
                    longitude    : data.longitude,
                    isp          : data.org,
                    geo_timezone : data.timezone,
                    currency     : data.currency
                } );

                visitor.geo_source = 'ipapi.co'; /* Record which service responded */
            },
            onFail
        );
    };


    /* ---- Service 3 : ipinfo.io ----
     * WARNING : free tier is capped at 50 000 requests per month.
     * See the rate-limit documentation at the top of Part 10. */
    var tryIpinfoIo = function ( onFail ) {
        xhrGet( 'https://ipinfo.io/json', 8000,
            function ( text ) {
                var data;
                try { data = JSON.parse( text ); } catch ( e ) { onFail(); return; }
                if ( ! data || data.error ) { onFail(); return; }

                /* ipinfo.io returns latitude/longitude as "lat,lng" string. */
                var lat = '';
                var lng = '';
                if ( data.loc ) {
                    var loc = data.loc.split( ',' );   /* Split "48.8566,2.3522" */
                    lat = loc[0] || '';                /* First part = latitude  */
                    lng = loc[1] || '';                /* Second part = longitude */
                }

                applyGeoData( {
                    ip           : data.ip,
                    country_code : data.country,
                    city         : data.city,
                    region_name  : data.region,
                    postal_code  : data.postal,
                    latitude     : lat,
                    longitude    : lng,
                    isp          : data.org,
                    geo_timezone : data.timezone
                } );

                visitor.geo_source = 'ipinfo.io'; /* Record which service responded */
            },
            onFail
        );
    };


    /* ---- Service 4 : freeipapi.com ----
     * WARNING : free tier is capped at 60 requests per minute.
     * See the rate-limit documentation at the top of Part 10.
     * This is a last-resort fallback. */
    var tryFreeIpApi = function ( onFail ) {
        xhrGet( 'https://freeipapi.com/api/json', 8000,
            function ( text ) {
                var data;
                try { data = JSON.parse( text ); } catch ( e ) { onFail(); return; }
                if ( ! data || ! data.ipAddress ) { onFail(); return; }

                applyGeoData( {
                    ip           : data.ipAddress,
                    ip_type      : data.ipVersion === 4 ? 'IPv4' : 'IPv6',
                    country_code : data.countryCode,
                    country_name : data.countryName,
                    region_name  : data.regionName,
                    city         : data.cityName,
                    postal_code  : data.zipCode,
                    latitude     : data.latitude,
                    longitude    : data.longitude,
                    geo_timezone : data.timeZone,
                    currency     : data.currency ? data.currency.code : ''
                } );

                visitor.geo_source = 'freeipapi.com'; /* Record which service responded */
            },
            onFail
        );
    };


    /* Entry point for the geo chain.
     * Each service receives the next service as its onFail callback.
     * If all four fail, geo_loaded stays false and geo_source stays 'none'. */
    var loadGeoData = function () {

        tryIpwhoIs( function () {         /* Service 1 failed -> try service 2 */
            tryIpapiCo( function () {     /* Service 2 failed -> try service 3 */
                tryIpinfoIo( function () { /* Service 3 failed -> try service 4 */
                    tryFreeIpApi( function () { /* Service 4 failed -> all services exhausted */
                        visitor.geo_loaded = false;
                        visitor.geo_source = 'all_failed';
                    } );
                } );
            } );
        } );
    };


    /* =========================================================================
     *
     * PART 11 - PUBLIC UTILITY METHODS
     *
     * ========================================================================= */

    visitor.toJSON = function () {
        var snap = {};
        var key;
        for ( key in visitor ) {
            if ( visitor.hasOwnProperty( key ) && typeof visitor[ key ] !== 'function' ) {
                snap[ key ] = visitor[ key ];
            }
        }
        return JSON.stringify( snap, null, 2 );
    };


    /* ------------------------------------------------------------------
     * visitor.debug()
     *
     * FIX (vs VisitorLens) :
     *   VisitorLens checked only if console existed.
     *   In IE8 with the developer tools closed, console exists as an
     *   object but console.group, console.table, and console.log are
     *   undefined, causing silent errors.
     *   VisitorLens-Pro checks each method individually before calling it.
     * ------------------------------------------------------------------ */
    visitor.debug = function () {

        /* Step 1 : verify that a console object exists at all. */
        if ( typeof console === 'undefined' || console === null ) { return; }

        /* Step 2 : open a collapsible group if the method is available. */
        if ( typeof console.group === 'function' ) {
            console.group( '[VisitorLens Pro] Full Visitor Profile' );
        }

        /* Step 3 : prefer table view, fall back to plain log, then give up. */
        if ( typeof console.table === 'function' ) {
            console.table( visitor );          /* Chrome, Firefox, Edge : clean table */
        } else if ( typeof console.log === 'function' ) {
            console.log( '[VisitorLens Pro]', visitor ); /* IE9-11, Safari fallback  */
        }
        /* If neither console.table nor console.log exist (IE8 dev tools closed),
           we simply skip output rather than throw an error. */

        /* Step 4 : close the group if it was opened. */
        if ( typeof console.groupEnd === 'function' ) {
            console.groupEnd();
        }
    };


    visitor.getCurrency = function () {

        var code = visitor.country_code;
        if ( ! code || code === 'pending' || code === 'N/A' ) { return 'USD'; }

        var eurozone = [
            'AT','BE','CY','EE','FI','FR','DE','GR','IE','IT',
            'LV','LT','LU','MT','NL','PT','SK','SI','ES','HR'
        ];
        var i;
        for ( i = 0; i < eurozone.length; i++ ) {
            if ( code === eurozone[ i ] ) { return 'EUR'; }
        }

        var map = {
            'US':'USD','GB':'GBP','JP':'JPY','CN':'CNY','CA':'CAD',
            'AU':'AUD','CH':'CHF','SE':'SEK','NO':'NOK','DK':'DKK',
            'NZ':'NZD','SG':'SGD','HK':'HKD','KR':'KRW','IN':'INR',
            'BR':'BRL','MX':'MXN','RU':'RUB','ZA':'ZAR','NG':'NGN',
            'EG':'EGP','AR':'ARS','CL':'CLP','TR':'TRY','PL':'PLN',
            'CZ':'CZK','HU':'HUF','RO':'RON','TH':'THB','ID':'IDR',
            'MY':'MYR','PH':'PHP','VN':'VND','IL':'ILS','AE':'AED',
            'SA':'SAR','MA':'MAD','PK':'PKR','UA':'UAH','KZ':'KZT',
            'QA':'QAR','KW':'KWD','OM':'OMR','BH':'BHD','JO':'JOD',
            'LB':'LBP','TN':'TND','DZ':'DZD','GH':'GHS','KE':'KES',
            'TZ':'TZS','UG':'UGX','ET':'ETB','CI':'XOF','SN':'XOF'
        };

        return map[ code ] || 'USD';
    };


    visitor.isMobile = function () {
        return visitor.device_type === 'Mobile' || visitor.device_type === 'Tablet';
    };


    visitor.getGreeting = function () {
        var h = new Date().getHours();
        if ( h >= 5  && h < 12 ) { return 'Good morning';   }
        if ( h >= 12 && h < 18 ) { return 'Good afternoon'; }
        if ( h >= 18 && h < 22 ) { return 'Good evening';   }
        return 'Good night';
    };


    visitor.onGeoReady = function ( callback ) {
        if ( typeof callback !== 'function' ) { return; }
        if ( visitor.geo_loaded ) { callback(); return; }

        var attempts = 0;
        var MAX      = 50; /* 50 x 200ms = 10 seconds max */

        var poll = setInterval( function () {
            attempts++;
            if ( visitor.geo_loaded || visitor.geo_source === 'all_failed' ) {
                clearInterval( poll );
                callback();
                return;
            }
            if ( attempts >= MAX ) {
                clearInterval( poll );
                callback(); /* Call anyway so consuming code is never left waiting */
            }
        }, 200 );
    };


    /* =========================================================================
     *
     * PART 12 - STARTUP
     *
     * ========================================================================= */

    assembleSyncData(); /* Synchronous - fills most of visitor.* immediately */
    loadGeoData();      /* Asynchronous - fills visitor.city, visitor.country_name, etc. */


    /* Return visitor so the UMD wrapper can export it. */
    return visitor;

} ) ); /* End of UMD factory and IIFE */
