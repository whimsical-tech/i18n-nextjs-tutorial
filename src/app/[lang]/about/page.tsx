import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Locale } from "@/i18n-config";
import { getTranslation } from "@/locales";
import styles from "./about.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getTranslation(lang);
  const t = dictionary.about;

  return {
    title: t["metadataTitle"],
    description: t["metadataDescription"],
  };
}

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getTranslation(lang);
  const t = dictionary.about;
  return (
    <div className={styles.page}>
      <SiteHeader params={params} active="about" />
      <main className={styles.main}>
        <div>
          <p className={styles.kicker}>About Hare Real Estate</p>
          <h1 className={styles.title}>{t["companyProfile"]}</h1>
          <p className={styles.lead}>{t["note"]}</p>
        </div>

        <section className={styles.section} aria-labelledby="mission-heading">
          <h2 id="mission-heading">{t["missionTitle"]}</h2>
          <p>{t["mission"]}</p>
        </section>

        <section className={styles.section} aria-labelledby="outline-heading">
          <h2 id="outline-heading">{t["overviewTitle"]}</h2>
          <ul>
            <li>{t["companyName"]}</li>
            <li>{t["address"]}</li>
            <li>{t["founding"]}</li>
            <li>{t["capital"]}</li>
            <li>{t["employeesCount"]}</li>
            <li>{t["businessActivities"]}</li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="values-heading">
          <h2 id="values-heading">{t["valuesTitle"]}</h2>
          <div className={styles.grid}>
            <ValueCard
              title={t["transparencyTitle"]}
              body={t["transparencyText"]}
            />
            <ValueCard title={t["locationTitle"]} body={t["locationText"]} />
            <ValueCard title={t["teamTitle"]} body={t["teamText"]} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="history-heading">
          <h2 id="history-heading">{t["historyTitle"]}</h2>
          <ul>
            <li>{t["history2010"]}</li>
            <li>{t["history2013"]}</li>
            <li>{t["history2016"]}</li>
            <li>{t["history2019"]}</li>
            <li>{t["history2022"]}</li>
            <li>{t["history2026"]}</li>
          </ul>
        </section>

        <p className={styles.note}>{t["footerNote"]} </p>
      </main>
      <SiteFooter t={dictionary} />
    </div>
  );
}
