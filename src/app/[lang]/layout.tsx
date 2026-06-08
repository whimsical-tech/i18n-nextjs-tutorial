import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";
import { Locale } from "@/i18n-config";
import { getTranslation } from "@/locales";
import "../globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ja" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getTranslation(lang);
  const t = dictionary;

  return {
    title: t["companyName"],
    description: t["slogan"],
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang} className={notoSansJp.variable}>
      <body
        style={{
          fontFamily:
            "var(--font-noto-sans-jp), 'Hiragino Sans', 'Yu Gothic UI', Meiryo, sans-serif",
        }}
      >
        <I18nProvider lang={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}
