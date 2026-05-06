import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { I18nProvider } from "@/components/I18nProvider";
import { Locale } from "@/i18n-config";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "晴レ不動産 | 首都圏の売買・賃貸物件",
  description:
    "東京都・大阪府・神奈川県を中心に、売買および賃貸の優良物件情報をご案内するデモサイトです。",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
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
