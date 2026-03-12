# Changelog - VisitorLens Pro

All notable changes are documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-03-12

### Fixed - all issues identified in VisitorLens v2 have been resolved

**File size and distribution**
Generated `dist/visitor.min.js` (14.6 KB, 70% smaller than the source).
Added `scripts/build.js` Terser build script runnable with `node scripts/build.js`.
Added jsDelivr CDN URL : `https://cdn.jsdelivr.net/gh/madjeek-web/visitorlens-pro@latest/dist/visitor.min.js`

**Module format support**
Rewrapped the library with a UMD (Universal Module Definition) pattern.
The same file now works as a plain script tag, a CommonJS `require()`, and an AMD module.
Added `src/main/visitor.esm.js` as a dedicated ES module entry point with named exports.
Updated `package.json` with `"main"`, `"module"`, and `"browser"` fields for bundler compatibility.

**GeoIP resilience**
Added 2 additional GeoIP fallback services (ipinfo.io and freeipapi.com) for a total of 4.
Added `visitor.geo_source` property that records which service delivered the data.
Fixed `visitor.onGeoReady` polling to also stop when `geo_source` becomes `"all_failed"`,
preventing an unnecessary 10-second wait when all services have already failed.
Extracted shared XHR logic into a reusable `xhrGet()` helper.
Extracted geo field writing into a shared `applyGeoData()` function to eliminate duplication.

**Rate limit documentation**
All four GeoIP services now have their rate limits documented prominently at the top of
Part 10 in the source file and in a dedicated table in the README.
A recommendation to self-host a MaxMind GeoLite2 database is included for high-traffic sites.

**Ad-blocker detection**
Replaced the single DOM bait technique with a 3-technique majority vote :
Technique A : DOM bait element with an expanded class list targeting EasyList, uBlock, and AdGuard filter lists.
Technique B : Check for known ad-blocker window globals (uBlock Origin, Ghostery, AdBlock Plus, AdGuard).
Technique C : Fetch probe to a known ad-network domain (falls back gracefully in IE11 and older).
Result is `true` only when at least 2 of the 3 techniques report a blocker, reducing false positives.

**visitor.debug() safety on old browsers**
Added individual checks for `console.group`, `console.groupEnd`, `console.table`, and `console.log`
before calling each method. The function now silently skips any missing method instead of throwing.
This fixes a silent error in Internet Explorer 8 with the developer tools panel closed.

**GeoIP test coverage**
Added 8 Jest tests for the GeoIP layer using a controlled XMLHttpRequest mock.
All GeoIP tests run offline, deterministically, and without any real HTTP requests.
Tests cover : successful primary response, fallback chain trigger, all-services-failed path,
and malformed JSON handling.
Total test count increased from 0 (VisitorLens) to 46 passing tests.

---

## [2.0.0] - 2026-03-12 (VisitorLens)

See the VisitorLens repository for the v2 changelog.

---

## [1.0.0] - Original visitor.js by Chirag Jain

Initial implementation providing browser detection, MaxMind GeoIP via HTTP,
and basic session cookie management.
