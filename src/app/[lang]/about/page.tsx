import type { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "会社概要 | 晴レ不動産",
  description:
    "晴レ不動産株式会社のミッション、沿革、数字の目安をご紹介します（プレースホルダ）。",
};

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export default function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  return (
    <div className={styles.page}>
      <SiteHeader params={params} active="about" />
      <main className={styles.main}>
        <div>
          <p className={styles.kicker}>About Hare Real Estate</p>
          <h1 className={styles.title}>会社概要（プレースホルダ）</h1>
          <p className={styles.lead}>
            ここに掲載する沿革・代表メッセージ・組織図などはすべてダミーです。実在の企業とは関係ありません。
            文章量を確保するため、業界でよくある見出し構成を意識して並べています。
          </p>
        </div>

        <section className={styles.section} aria-labelledby="mission-heading">
          <h2 id="mission-heading">ミッションステートメント</h2>
          <p>
            「住まいは人生の舞台装置である」という信念のもと、お客様一人ひとりのライフステージに合わせた住環境を提案します。
            売買・賃貸の垣根を越えて、資産性と快適性のバランスを言語化することが私たちの役目です。
          </p>
        </section>

        <section className={styles.section} aria-labelledby="outline-heading">
          <h2 id="outline-heading">会社のあらまし（架空）</h2>
          <ul>
            <li>商号：晴レ不動産株式会社（かな表記：はれふどうさん）</li>
            <li>本店所在地：東京都港区芝公園4-2-8（仮）</li>
            <li>設立：2010年4月1日（デモ値）</li>
            <li>資本金：1億円（デモ値）</li>
            <li>従業員数：約180名（グループ全体・デモ値）</li>
            <li>
              事業内容：売買仲介、賃貸仲介、賃貸管理、不動産コンサルティング
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="values-heading">
          <h2 id="values-heading">バリュー（行動指針の例）</h2>
          <div className={styles.grid}>
            <ValueCard
              title="透明性を最優先する"
              body="重要事項説明は早めの段階で共有し、図面修正や価格変更の履歴も追えるようにします（デモ文）。"
            />
            <ValueCard
              title="現地と地図を往復する"
              body="スクリーン上の距離感だけで終わらせず、徒歩ルートを何度も検証します（デモ文）。"
            />
            <ValueCard
              title="チームで引き継ぐ"
              body="担当者が不在でも進むよう、ノートとCRMに判断理由を残します（デモ文）。"
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="history-heading">
          <h2 id="history-heading">沿革（ダミー年表）</h2>
          <ul>
            <li>2010年：東京都港区にて創業、賃貸仲介から事業開始</li>
            <li>2013年：売買部門を新設、中古マンション再販に本格参入</li>
            <li>2016年：大阪支店を開設、関西圏のネットワーク拡大</li>
            <li>2019年：法人向けリロケーション窓口を立ち上げ</li>
            <li>
              2022年：顧客向けポータルのベータ版を公開（本サイトとは無関係）
            </li>
            <li>2026年：デモ用Next.jsアプリの公開（本ページ）</li>
          </ul>
        </section>

        <p className={styles.note}>
          免許番号・加盟団体・苦情処理窓口などの表記はフッター側に集約しています。実務では必ず最新の表示に差し替えてください。
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
