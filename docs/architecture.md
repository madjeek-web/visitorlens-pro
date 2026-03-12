# Architecture - VisitorLens Pro

## Module format

The library uses a UMD (Universal Module Definition) wrapper around the factory function
that builds and returns the visitor object.

```
(function(root, factory) {
    if AMD        -> define([], factory)
    if CommonJS   -> module.exports = factory()
    if script tag -> root.visitor = factory()
}(globalThis, function() {
    ...
    return visitor;
}));
```

This means the exact same file works in every loading context without modification.
For native ES module usage, a thin wrapper (`visitor.esm.js`) re-exports the CommonJS build.

## Internal structure

```
factory() runs
    |
    ├── BrowserDetect.init()      synchronous - populates name, version, engine, OS
    ├── assembleSyncData()        synchronous - writes 50+ properties to visitor.*
    │       calls all detection modules
    │       calls loadVisitorSession() which reads/writes the cookie
    │       starts ad-blocker detection (async, resolves ~150ms later)
    │       sets geo placeholder properties to "pending"
    │
    ├── loadGeoData()             asynchronous - starts the 4-service chain
    │       tryIpwhoIs()
    │           on success: applyGeoData(), set geo_source = "ipwho.is"
    │           on failure: tryIpapiCo()
    │                           on success: applyGeoData(), set geo_source = "ipapi.co"
    │                           on failure: tryIpinfoIo()
    │                                           on success: applyGeoData(), set geo_source = "ipinfo.io"
    │                                           on failure: tryFreeIpApi()
    │                                                           on success: applyGeoData(), set geo_source = "freeipapi.com"
    │                                                           on failure: set geo_source = "all_failed"
    |
    return visitor
```

## xhrGet helper

All four GeoIP service calls go through a shared `xhrGet(url, timeout, onOK, onFail)` function.
This eliminates the duplicated XHR setup code that existed in VisitorLens v2.

## applyGeoData helper

All four services normalize their response into a common plain object before calling
`applyGeoData(d)` which writes the fields to `visitor.*`. This means each service
adapter only needs to map its own field names once, and the geo property writing
logic lives in exactly one place.

## Ad-blocker detection (3-technique majority vote)

```
detectAdBlocker(callback)
    |
    ├── Technique A : DOM bait element
    │       Create div with ad-targeting CSS classes
    │       Inject into document.body
    │       Wait 150ms
    │       Check if hidden or removed by extension
    │       Call tally(blocked)
    │
    ├── Technique B : Known extension globals
    │       Check window for uBlockOrigin, adblock, ghostery, etc.
    │       Call tally(found) synchronously
    │
    └── Technique C : Fetch probe to ad-network URL
            fetch("https://pagead2.googlesyndication.com/...")
                success -> tally(false)
                failure -> tally(true)
            If fetch not available (IE) -> reduce expected total by 1
    |
    tally() : when all techniques have reported, callback(votes >= 2)
    Majority vote prevents a single countermeasure from giving false result.
```

## Cookie format

Cookie name : `visitorlens`
Format : `{count}__{ISO8601_date}`
Example : `7__2025-11-05T09:30:00.000Z`
Expiry : 3650 days (10 years)
Attributes : `SameSite=Lax`

## Build pipeline

```
npm run build
    |
    node scripts/build.js
        |
        reads src/main/visitor.js
        passes to terser.minify() with mangle.reserved = ['visitor']
        prepends one-line license banner
        writes dist/visitor.min.js
        reports original size vs minified size
```

The `visitor` identifier is in the mangle reserved list so the global variable
name is never shortened. All other internal names are mangled for maximum compression.
