import { NextRequest, NextResponse } from "next/server";
import { i18n, Locale } from "./i18n-config";

const { defaultLocale, locales } = i18n;

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferredLocales = acceptLanguage.split(",").map((lang) => {
    const code = lang.split(";")[0].replace(/\s+/g, "");
    return code.substring(0, 2).toLowerCase();
  });

  const matched = preferredLocales.find((lang) =>
    locales.includes(lang as Locale),
  );
  return matched ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(request.nextUrl);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|public|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
