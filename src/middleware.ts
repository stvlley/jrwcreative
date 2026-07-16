import { NextResponse, type NextRequest } from "next/server";

// Site taken offline. This middleware short-circuits every request before any
// page, API route, or CMS handler runs, returning a bare page with HTTP 410
// Gone so search engines drop the URLs. To bring the site back, delete this
// file — nothing else was changed.
const GONE_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>410 Gone</title>
<style>
  html,body{height:100%;margin:0}
  body{display:flex;align-items:center;justify-content:center;background:#ffffff;color:#111111;font:14px/1.5 ui-sans-serif,system-ui,-apple-system,sans-serif}
</style>
</head>
<body>410 Gone</body>
</html>`;

export function middleware(_request: NextRequest) {
  return new NextResponse(GONE_PAGE, {
    status: 410,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, max-age=0",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export const config = {
  // Match every path, including the root, API routes, and static/_next assets.
  matcher: "/:path*",
};
