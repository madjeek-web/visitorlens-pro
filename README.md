<p align="center">
<img src="https://github.com/madjeek-web/visitorlens-pro/raw/main/visitor_lens_pro_cover_01.png" alt="Visitor Lens cover 1 png image" width="100%" height="100%">
</p>

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

## VisitorLens Pro : what it really is, explained simply

---

### The image of the physical world

When you enter an Apple store, the salesperson knows in 10 seconds that you are in a hurry, that you have come from far away, that you are looking for something specific. He adapts his pitch. He talks to you about the right thing at the right time.

On the internet, without a tool, a website is blind. Someone visits. That's it. You don't know where they come from, on what screen they are looking, if they have been before, if their connection is slow, if they speak French or Japanese.

VisitorLens Pro gives this sight back to the website. Automatically. Silently. From the very first second.

---

### In one sentence

It's a small JavaScript file that you paste into any web page. It loads silently and builds a complete portrait of each visitor, available immediately in the site's code, without a server, without an account to create, without a subscription.

---

### What it sees on each visitor

**The browser and device**

It recognizes Chrome, Firefox, Safari, Internet Explorer, Edge, Brave, Samsung Internet, and about twenty other browsers, from the oldest to the newest in 2026. It knows if the person is on a phone, a tablet, or a computer. It knows the number of processor cores, the screen size, if the person has enabled dark mode on their system, if they prefer less animation (useful for people suffering from dizziness).

**The location**

Via four free and secure geographic services, used one after the other in case of failure, it identifies the country, city, region, postal code, time zone, internet service provider, and local currency of each visitor. Without asking for GPS permission. Without a form. In less than a second.

**The network connection**

It knows if the visitor is on 4G, wifi, or a slow connection. It measures the page load time and DNS speed. These figures make it possible to adapt what the site sends.

**The session**

A cookie remembers the number of visits, the date of the first, and today's date. The site therefore knows if it's the first time this person has come, or if it's the seventh.

**Privacy preferences**

It detects if the visitor uses an ad blocker (via three cross-checked techniques to be reliable), if cookies are enabled, if local storage works, and if the browser has the "do not track" mode active.

**What the browser can do**

It checks if the browser supports 3D (WebGL), which GPU is used, if push notifications are available, if GPS geolocation is accessible, if web bluetooth works.

---

### How a company uses it concretely

**An e-commerce site**

A visitor arrives from Japan. Automatically, prices are displayed in yen, the interface switches to Japanese, local delivery options appear. Zero clicks on their part. Zero manual configuration.

**A digital agency**

A client arrives on the site from an old work computer running Windows 7 with Internet Explorer. The site detects this and loads a compatible version, rather than a modern interface that would appear broken.

**A SaaS startup**

The team wants to know how many of its users arrive on mobile, from which countries, with what connection speed. It collects this data without paying for Google Analytics, without GDPR imposed by a third party, with total control.

**A blog or an independent shop**

From the third visit onwards, a personalized welcome message is displayed. A loyalty offer appears. All without the visitor having created an account.

**An accessibility site**

The visitor has enabled dark mode and reduced motion on their system. The site adapts instantly, without anyone having to click on anything.

**A multimedia site**

The visitor's connection is detected as slow (2G or 3G). The site automatically loads lightweight images and does not enable autoplay videos. The experience remains smooth even on a difficult connection.

---

### Why it's technically serious

The project exists in three different formats : a classic file for simple sites, a CommonJS module for Node.js and automated tests, and an ES module for React, Vue, Vite, and all modern tools. A compilation script automatically generates a lightweight version of 14.6 KB (70% smaller than the full source code). An international CDN URL via jsDelivr allows using it without downloading anything. 46 automated tests verify that everything works, including simulated network failures.

---

### What this project is not

It does not store anything on an external server. It does not sell any data. It does not share anything with advertisers. Everything stays in the visitor's browser. It is the site owner who decides what to do with this information.

---

### For whom, in summary

For the beginner developer who wants to learn : every line of the source code is commented and explained.

For the experienced developer who wants a lightweight, dependency-free brick, integrable in five minutes into any project.

For the entrepreneur or project manager who wants to understand their visitors without paying for a subscription to an analytics tool.

For the teacher looking for a concrete and complete example to teach browser APIs, cookies, asynchronous HTTP requests, and feature detection.

---





## VisitorLens Pro and the law : what you need to know

---

### The legal reality in one sentence

VisitorLens Pro collects personal data within the meaning of the GDPR. The fact that it is a small, free JavaScript file changes nothing. The law applies as soon as a piece of data makes it possible to identify or locate a person, even indirectly.

---

### What triggers the GDPR in this project

**The IP address is personal data**

This is the central point. The Court of Justice of the European Union has confirmed it. As soon as a site collects a visitor's IP address, even to transmit it to an external GeoIP service, it is processing personal data within the meaning of the GDPR.

VisitorLens Pro sends the visitor's IP address to four external services (ipwho.is, ipapi.co, ipinfo.io, freeipapi.com) to obtain their location. This is a transfer of personal data to a third party.

**The session cookie is personal data**

The `visitorlens` cookie placed in the visitor's browser memorizes the number of visits and the date of the first visit. Even without a name or email address, this cookie makes it possible to recognize a returning visitor. It is a unique identifier. It is personal data.

**The combination of data creates a profile**

Browser + system + resolution + language + city + time zone + internet service provider : taken separately, these elements seem harmless. Combined, they form a fingerprint that can identify a person in a near-unique way. This is what is known as fingerprinting. The CNIL expressly targeted it in its 2020 recommendations.

---

### What the GDPR says concretely

**Article 6 : mandatory legal basis**

Personal data cannot be collected without a valid legal reason. For VisitorLens Pro used in its full version, the most appropriate legal basis is the visitor's explicit consent (checkbox, cookie banner). Legitimate interest can also be invoked but it must be documented and proportionate.

**Article 13 : mandatory information**

The visitor must be informed of what is collected, why, for how long, and to whom the data is transmitted. The four GeoIP services must appear in the site's privacy policy.

**Article 7 : consent**

If the chosen legal basis is consent, it must be free, informed, specific, and given before the data is collected. This means VisitorLens Pro should not load before the visitor has accepted.

**Article 17 : right to erasure**

A visitor may request the deletion of their data. For VisitorLens Pro, this means deleting the cookie and any data stored server-side if it has been recorded.

**Article 28 : data processor**

The four GeoIP services are data processors within the meaning of the GDPR. The site controller must verify that each one has a DPA (Data Processing Agreement) and complies with the GDPR. Ipapi.co and ipinfo.io offer one. Ipwho.is and freeipapi.com are less documented on this point.

---

### Other applicable laws

**The ePrivacy Directive (cookie law in Europe)**

It requires consent before placing any cookie that is not strictly necessary for the operation of the service. The `visitorlens` cookie is an analytical session cookie. It falls into this category. A compliant consent banner is therefore mandatory.

**The French Data Protection Act (Informatique et Libertés)**

It applies in addition to the GDPR for sites operated from France. The CNIL is the supervisory authority. It can impose fines of up to 4% of global turnover or 20 million euros.

**The Privacy Shield / Data Privacy Framework**

The GeoIP services used are hosted in the United States. The transfer of data to the United States has been governed by the Data Privacy Framework (DPF) since July 2023. It is necessary to verify that each service is registered with the DPF or to provide alternative safeguards (standard contractual clauses).

**The California CCPA / CPRA law**

If the site is accessible from California and exceeds certain activity thresholds, the California Consumer Privacy Act applies. It gives California residents rights similar to those under the GDPR : access, deletion, refusal to sell data.

**The Brazilian LGPD**

For sites with traffic from Brazil, the Lei Geral de Proteção de Dados applies with principles close to those of the GDPR.

---

### What protects and what exposes

| Situation | Legal risk |
|---|---|
| The site only loads VisitorLens Pro after explicit consent | Low risk |
| The site loads VisitorLens Pro for all visitors without a banner | High risk (CNIL) |
| The privacy policy mentions the 4 GeoIP services | Low risk |
| The visitorlens cookie is placed without prior information | High risk |
| Collected data never leaves the browser | Moderate risk |
| Data is sent to a server without a DPA with the sub-processors | High risk |

---

### What should be added to the project to be compliant

**1. A conditional loading system**

VisitorLens Pro should offer an option to initialize only after verifying a consent signal, for example :
```javascript
if ( consentGiven === true ) {
    var script = document.createElement( 'script' );
    script.src = 'visitor.min.js';
    document.head.appendChild( script );
}
```

**2. A mandatory notice in the README**

A GDPR section in the README that clearly explains to every developer integrating the library that they are responsible for data processing compliance on the GDPR side.

**3. An up-to-date list of sub-processors**

A `THIRD_PARTIES.md` file listing the four GeoIP services, their privacy policies, their available DPAs, and their terms of use.

**4. An anonymized mode**

An option to disable the GeoIP request and the cookie, so that the project remains usable for collecting browser data only (which does not trigger the same obligations).

---

### An honest summary

VisitorLens Pro in its current state is a technically solid tool but legally incomplete for production deployment in Europe without modification. This is not a code defect. It is a responsibility that belongs to the developer or the company integrating it. The library provides the data. Legal compliance, banners, policies, and DPAs remain the responsibility of the one who deploys it.

Every data collection tool, even free, even open source, even tiny, engages the responsibility of the one who implements it. This is a reality that many developers discover too late.



VisitorLens Pro is a tool. Like a kitchen knife: used properly, it’s helpful to everyone. Used poorly, it creates problems.

The library itself does not collect anything in a hidden way, does not resell anything, and communicates only with the documented GeoIP services. Everything is transparent, everything is readable in the source code, line by line.

What matters is how you implement it. If you use it with a consent banner and a clear privacy policy, you’re in compliance. That’s exactly what thousands of sites do with Google Analytics, Hotjar, or any other tool on the market.

The difference here is that you know exactly what the code does, because it is fully commented and open source. You don’t have to trust a black box.

Like any audience measurement tool, VisitorLens Pro must be used with a consent banner. This is not a specific requirement for this project—it’s simply the rule that applies to any similar tool on the market. The difference here is that the code is fully open source and commented. You know exactly what’s happening. No black box, no surprises.




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

<p align="center">
<img src="https://github.com/madjeek-web/visitorlens-pro/raw/main/visitor_lens_pro_cover_02.png" alt="Visitor Lens cover 2 png image" width="100%" height="100%">
</p>

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

MIT License - 12 / 03 / 2026 - Fabien Conéjéro

Author : [https://github.com/madjeek-web](https://github.com/madjeek-web)

Demo page : [https://madjeek-web.github.io/visitor-lens-pro-demo-page.html](https://madjeek-web.github.io/visitor-lens-pro-demo-page.html)

##

## ༄☕︎︎︎ Buy Me A Coffee :

<a href="https://donate.stripe.com/3cI6oH1nUgsy8WZdVHgEg00" target="_blank" rel="noopener noreferrer"><img src="https://github.com/madjeek-web/eventflow/raw/main/Buy_Me _A_Coffee.jpg" alt="Buy Me A Coffee image" width="25%" height="25%"></a>

༄☕︎︎︎ [stripe.com](https://donate.stripe.com/3cI6oH1nUgsy8WZdVHgEg00)

. Thank you for your support
