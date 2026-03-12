# VisitorLens Pro

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES5%2B%20%7C%20ESM%20%7C%20CJS-F7DF1E)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey)
![GeoIP: HTTPS](https://img.shields.io/badge/GeoIP-4%20services%20%7C%20HTTPS%20%7C%20Free-brightgreen)
![Code Style: JSDoc](https://img.shields.io/badge/Code%20Style-Every%20line%20commented-blue)
![Browser Support](https://img.shields.io/badge/Browsers-IE8%20to%202026-blue)
![Module: UMD](https://img.shields.io/badge/Module-UMD%20%7C%20ESM%20%7C%20CJS-orange)
![Tests: 46 passing](https://img.shields.io/badge/Tests-46%20passing-brightgreen)
![Minified: 14.6 KB](https://img.shields.io/badge/Minified-14.6%20KB-informational)
![Status: Stable](https://img.shields.io/badge/Status-Stable-brightgreen)
![Version](https://img.shields.io/badge/Version-3.0.0-informational)

A pure JavaScript library that builds a complete profile of anyone who visits your website.
One script tag. No dependencies. No API key. Works as a plain script, a CommonJS module, or an ES module.

---

## Quick start

### Option 1 - CDN (recommended for production)

```html
<script src="https://cdn.jsdelivr.net/gh/madjeek-web/visitorlens-pro@latest/dist/visitor.min.js"></script>
<script>
    console.log( visitor.browser_name );
    visitor.onGeoReady( function () {
        console.log( visitor.city );
        console.log( visitor.getCurrency() );
    } );
</script>
```

The CDN is provided by [jsDelivr](https://www.jsdelivr.com), which serves from GitHub automatically.
No account, no API key, no configuration required.

To pin a specific version and avoid breaking changes :

```html
<script src="https://cdn.jsdelivr.net/gh/madjeek-web/visitorlens-pro@3.0.0/dist/visitor.min.js"></script>
```

### Option 2 - Self-hosted file

Download `dist/visitor.min.js` and place it in your project.

```html
<script src="/js/visitor.min.js"></script>
```

### Option 3 - ES Module (React, Vue, Vite, Rollup)

```javascript
import visitor from './src/main/visitor.esm.js';

visitor.onGeoReady( () => {
    console.log( visitor.city, visitor.getCurrency() );
} );
```

Or with named imports :

```javascript
import visitor, { isMobile, getCurrency, onGeoReady } from './src/main/visitor.esm.js';
```

### Option 4 - CommonJS (Node.js, Jest, Webpack, Browserify)

```javascript
var visitor = require( './src/main/visitor.js' );
console.log( visitor.browser_name );
```

---

## GeoIP services and rate limits

> **Important - read before deploying to a high-traffic site.**

VisitorLens Pro tries four free GeoIP services in sequence. The first one that responds
successfully stops the chain. The `visitor.geo_source` property tells you which service
delivered the data.

| Priority | Service | Free limit | HTTPS | API key |
|---|---|---|---|---|
| 1 (primary) | [ipwho.is](https://ipwho.is) | Unlimited | Yes | None |
| 2 (fallback) | [ipapi.co](https://ipapi.co) | **1 000 requests per day** | Yes | None |
| 3 (fallback) | [ipinfo.io](https://ipinfo.io) | **50 000 requests per month** | Yes | None |
| 4 (last resort) | [freeipapi.com](https://freeipapi.com) | **60 requests per minute** | Yes | None |

**What happens when all services fail :**
`visitor.geo_loaded` is set to `false` and `visitor.geo_source` is set to `"all_failed"`.
All geo properties keep their `"N/A"` value. The `onGeoReady` callback still fires so
consuming code is never left waiting.

**For sites with more than a few thousand visitors per day :**
Consider self-hosting a [MaxMind GeoLite2](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data)
database on your server and querying it server-side. The GeoLite2 City database is free,
updated weekly, and has no per-request limits.

---

## What does it collect ?

### Browser

| Property | Example |
|---|---|
| `visitor.browser_name` | `"Chrome"` |
| `visitor.browser_version` | `"122.0.6261"` |
| `visitor.browser_engine` | `"Blink"` |
| `visitor.os` | `"Windows 10 / 11"` |
| `visitor.user_agent` | Full UA string |
| `visitor.language` | `"fr-FR"` |
| `visitor.languages` | `"fr-FR, fr, en"` |

Detected browsers : Brave, Samsung Internet, UC Browser, Yandex Browser, Vivaldi,
Opera (classic and modern), Edge (Chromium 2020+ and EdgeHTML 2015-2019),
Internet Explorer 6-11, Firefox, Waterfox, Pale Moon, Chrome, Safari,
OmniWeb, Konqueror, Camino, Netscape.

Detected operating systems : iOS, iPadOS, Android, Windows Phone, BlackBerry, Symbian,
Chrome OS, Windows XP through Windows 11, macOS, Linux, FreeBSD.

### Device

| Property | Example |
|---|---|
| `visitor.device_type` | `"Desktop"`, `"Mobile"`, `"Tablet"` |
| `visitor.cpu_cores` | `8` |
| `visitor.device_memory_gb` | `4` |
| `visitor.pixel_ratio` | `2` |
| `visitor.touch_support` | `true` |
| `visitor.max_touch_points` | `5` |

### Screen

| Property | Example |
|---|---|
| `visitor.screen_resolution` | `"1920x1080"` |
| `visitor.viewport_width` | `1280` |
| `visitor.viewport_height` | `800` |
| `visitor.color_depth` | `24` |
| `visitor.prefers_dark` | `true` |
| `visitor.prefers_reduced_motion` | `false` |
| `visitor.prefers_high_contrast` | `false` |

### Geographic location

| Property | Example |
|---|---|
| `visitor.ip` | `"88.23.45.67"` |
| `visitor.ip_type` | `"IPv4"` or `"IPv6"` |
| `visitor.country_code` | `"FR"` |
| `visitor.country_name` | `"France"` |
| `visitor.continent` | `"Europe"` |
| `visitor.capital` | `"Paris"` |
| `visitor.calling_code` | `"+33"` |
| `visitor.region_name` | `"Ile-de-France"` |
| `visitor.city` | `"Paris"` |
| `visitor.postal_code` | `"75001"` |
| `visitor.latitude` | `48.8566` |
| `visitor.longitude` | `2.3522` |
| `visitor.isp` | `"Orange"` |
| `visitor.asn` | `"AS3215"` |
| `visitor.geo_timezone` | `"Europe/Paris"` |
| `visitor.geo_timezone_utc` | `"+01:00"` |
| `visitor.is_dst` | `false` |
| `visitor.geo_source` | `"ipwho.is"` (tracks which service responded) |

### Network

| Property | Example |
|---|---|
| `visitor.connection_type` | `"4g"` |
| `visitor.downlink` | `"10 Mbps"` |
| `visitor.is_online` | `true` |
| `visitor.page_load_time` | `"342 ms"` |
| `visitor.dns_lookup_time` | `"18 ms"` |
| `visitor.referrer` | URL that linked here |

### Session

| Property | Example |
|---|---|
| `visitor.count` | `4` |
| `visitor.is_returning` | `true` |
| `visitor.first_visit_on` | `"2025-11-05T09:30:00.000Z"` |
| `visitor.current_visit_on` | `"2026-03-12T10:00:00.000Z"` |
| `visitor.timezone` | `"Europe/Paris"` |
| `visitor.timezone_offset` | `-60` |

### Privacy flags

| Property | Meaning |
|---|---|
| `visitor.do_not_track` | `"1"` = user opted out |
| `visitor.cookies_enabled` | `false` = cookies blocked |
| `visitor.local_storage_available` | `false` in strict private mode |
| `visitor.session_storage_available` | `false` in strict private mode |
| `visitor.ad_blocker_detected` | `true` if ad blocker found (3-technique majority vote) |

### Browser capabilities

| Property | Meaning |
|---|---|
| `visitor.has_webgl` | 3D graphics available |
| `visitor.gpu_renderer` | GPU model string |
| `visitor.has_canvas` | 2D drawing API available |
| `visitor.has_service_worker` | PWA / offline support |
| `visitor.has_notifications` | Push notification prompts |
| `visitor.has_geolocation` | GPS / network position |
| `visitor.has_webrtc` | Peer-to-peer connections |
| `visitor.has_clipboard_api` | Clipboard read / write |
| `visitor.has_intl` | Internationalization API |

---

## Utility methods

| Method | Returns | Description |
|---|---|---|
| `visitor.toJSON()` | String | Full profile as formatted JSON |
| `visitor.debug()` | void | Prints the profile to the browser console (safe on all browsers including IE8) |
| `visitor.getCurrency()` | String | ISO 4217 currency code for the visitor's country |
| `visitor.isMobile()` | Boolean | `true` for Mobile and Tablet |
| `visitor.getGreeting()` | String | Time-based greeting in English |
| `visitor.onGeoReady( fn )` | void | Calls `fn` once geo data is available |

---

## Usage examples

### Display local currency

```javascript
visitor.onGeoReady( function () {
    document.getElementById( 'price' ).innerText = '49 ' + visitor.getCurrency();
} );
```

### Adapt layout to mobile visitors

```javascript
if ( visitor.isMobile() ) {
    document.body.classList.add( 'mobile-layout' );
}
```

### Personalize for returning visitors

```javascript
if ( visitor.is_returning && visitor.count >= 3 ) {
    showLoyaltyOffer();
}
```

### Reduce motion for accessibility

```javascript
if ( visitor.prefers_reduced_motion ) {
    document.body.classList.add( 'no-animation' );
}
```

### Load lighter assets on slow connections

```javascript
if ( visitor.connection_type === '2g' || visitor.connection_type === 'slow-2g' ) {
    loadLowResImages();
}
```

### Know which GeoIP service responded

```javascript
visitor.onGeoReady( function () {
    console.log( 'Geo data from : ' + visitor.geo_source );
    /* "ipwho.is", "ipapi.co", "ipinfo.io", "freeipapi.com", or "all_failed" */
} );
```

### Export the full profile

```javascript
console.log( visitor.toJSON() );
```

---

## Running the build

The build script uses [Terser](https://terser.org) to minify `src/main/visitor.js`
and write the output to `dist/visitor.min.js`.

```bash
npm install
npm run build
```

Example output :

```
[build] VisitorLens Pro - Build complete
  Before  : 48.8 KB
  After   : 14.6 KB
  Saving  : 70.2%
```

---

## Running the tests

```bash
npm install
npx jest --forceExit
```

46 tests covering the visitor object structure, all utility methods, session management,
GeoIP chain behavior, the 4-service fallback logic, malformed JSON handling,
and `visitor.debug()` safety on browsers without `console.table` or `console.group`.

---

## Project structure

```
visitorlens-pro/
├── .github/
│   ├── workflows/
│   │   └── ci.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   └── architecture.md
├── src/
│   ├── main/
│   │   ├── visitor.js          Full UMD source (every line commented)
│   │   └── visitor.esm.js      ES Module wrapper
│   └── test/
│       └── visitor.test.js     Jest suite (46 tests, GeoIP mocked)
├── dist/
│   └── visitor.min.js          Minified build (14.6 KB, auto-generated)
├── scripts/
│   └── build.js                Terser build script
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

---

## Browser compatibility

Works in Internet Explorer 8 and every browser released since then.
Features that require newer APIs fall back to `"N/A"` or `null`.
The library never crashes on missing APIs.

The ES Module version (`visitor.esm.js`) requires a browser or bundler
that supports native ES modules (all modern browsers, no IE support).

---

## License

MIT License - 12 / 03 / 2026 - Fabien Conejero

Author : [https://github.com/madjeek-web](https://github.com/madjeek-web)

Demo page : [https://madjeek-web.github.io](https://madjeek-web.github.io)
