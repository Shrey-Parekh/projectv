# Security Notes

## Current Status

✅ **Critical vulnerabilities**: Fixed (Next.js updated to 14.2.35)

⚠️ **High severity vulnerabilities**: 4 remaining (non-critical for this project)

## Remaining Vulnerabilities

The remaining vulnerabilities are:

1. **glob CLI command injection** (high severity)
   - Affects: `eslint-config-next` (dev dependency only)
   - Impact: None for production builds
   - Fix: Would require upgrading to Next.js 16 (breaking change)

2. **Next.js Image Optimizer DoS** (high severity)
   - Affects: Self-hosted applications using `remotePatterns`
   - Impact: **Not applicable** - This project uses local images only, no `remotePatterns` configured
   - Fix: Would require Next.js 16

3. **Next.js Server Components DoS** (high severity)
   - Affects: Insecure React Server Components configurations
   - Impact: **Not applicable** - This project uses client components exclusively (`'use client'`)
   - Fix: Would require Next.js 16

## Why These Don't Affect This Project

- ✅ No `remotePatterns` in `next.config.mjs` - using local images only
- ✅ All components are client-side (`'use client'`) - no Server Components
- ✅ No Server Actions used
- ✅ Vulnerable `glob` is only in dev dependencies (not in production build)

## Recommendations

For production deployment:
- The current setup is **safe** for this project's use case
- Consider upgrading to Next.js 16+ in the future for complete security coverage
- Monitor Next.js security advisories: https://github.com/vercel/next.js/security

## Last Updated

- Next.js: 14.2.35 (patched for critical vulnerabilities)
- Date: February 2025
