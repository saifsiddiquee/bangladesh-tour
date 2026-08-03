# Security Specification

## Content Security Policy (CSP)
- Implement a robust CSP via Next.js Middleware or `next.config.js` headers.
- **Nonce-based Policy**: Utilize strict, nonce-based script policies where possible for inline scripts to prevent XSS.
- Example directives:
  - `default-src 'self'`
  - `script-src 'self' 'nonce-[hash]'`
  - `img-src 'self' https://images.unsplash.com data:`
  - `style-src 'self' 'unsafe-inline'`

## Security Headers
Configure standard security headers in `next.config.js`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (or `SAMEORIGIN`)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

## Cross-Site Scripting (XSS) Prevention
- **No `dangerouslySetInnerHTML`**: Avoid using `dangerouslySetInnerHTML` with any content that originates from user input or unverified external sources.
- **Sanitization**: If rendering HTML strings from a CMS or JSON is absolutely required, use a robust sanitizer like `DOMPurify` before rendering.

## Image Source Validation
- Restrict external image loading to specifically approved domains.
- In `next.config.js`, configure `remotePatterns` strictly:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**',
    },
  ],
}
```

## Dependency Management
- **Regular Audits**: Run `npm audit` regularly to identify vulnerabilities.
- **Version Pinning**: Pin major versions in `package.json` to prevent unexpected breaking changes or malicious updates from minor/patch releases.
- **Lockfiles**: Always commit `package-lock.json` or `npm-shrinkwrap.json` to ensure deterministic builds.

## Environment Variables
- **Never Expose Secrets**: Ensure sensitive API keys or secrets are NOT prefixed with `NEXT_PUBLIC_` unless they are explicitly designed to be public.
- Keep secrets server-side only.

## APIs and Server Actions
- **Input Validation**: Strictly validate and sanitize all inputs received by API routes or Server Actions.
- **Rate Limiting**: Implement rate limiting for API routes (e.g., search endpoints) to prevent abuse and DDoS.

## HTTPS
- Enforce HTTPS for all traffic. HSTS header ensures browsers automatically enforce this.

## Third-Party Scripts
- **Defer Loading**: Load non-essential third-party scripts (analytics, widgets) using Next.js `<Script>` component with `strategy="afterInteractive"` or `lazyOnload`.
- Ensure third-party scripts don't block the main thread.

## Supply Chain Security
- Keep dependencies minimal. Only install what is strictly necessary.
- Verify package integrity and maintainer reputation before adding new libraries.
