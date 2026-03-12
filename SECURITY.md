# Security Policy

## Supported versions

| Version | Supported |
|---|---|
| 2.x | Yes |
| 1.x | No |

## Reporting a vulnerability

If you discover a security issue in VisitorLens, please do not open a public GitHub issue.
Send a description of the vulnerability by email or via GitHub's private security advisory feature.

Include the following information :

- A description of the vulnerability and its potential impact.
- Steps to reproduce the issue.
- The version of VisitorLens you tested against.
- Any suggested fix or mitigation if you have one.

You can expect an acknowledgement within 5 business days
and a resolution or status update within 30 days.

## Security design notes

All GeoIP requests are made over HTTPS. The library does not send any personal data
to external services beyond the visitor's IP address, which is what any web server already receives.

The session cookie uses `SameSite=Lax` to reduce cross-site request forgery risk.
It does not use the `HttpOnly` flag because it is read by JavaScript by design.

The ad-blocker detection method does not load any external resource.
It creates and inspects a local DOM element only.

No data is sent to the library author or any third party by this library.
The only outbound requests are the GeoIP calls to ipwho.is and ipapi.co,
both of which are documented in `README.md`.
