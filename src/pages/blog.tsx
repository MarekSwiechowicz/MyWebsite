import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { TransitionEffect } from "@/components/TransitionEffect";
import SEO from "@/components/SEO";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllArticles, ArticleMeta } from "@/lib/articles";
import { suppressNextBlogEntry, setSuppressNextBlogEntry } from "@/lib/navState";

type BlogProps = {
  articles: ArticleMeta[];
};

const isArticleUrl = (url: string) =>
  /^(\/en|\/pl)?\/blog\/.+/.test(url);

const Blog = ({ articles }: BlogProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dateLocale = router.locale === "pl" ? "pl-PL" : "en-GB";

  const skipEntry = suppressNextBlogEntry();
  const [skipExit, setSkipExit] = useState(false);

  useEffect(() => {
    setSuppressNextBlogEntry(false);

    const handleRouteChangeStart = (url: string) => {
      setSkipExit(isArticleUrl(url));
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [router.events]);

  return (
    <>
      <SEO
        title={`${t("blog", "Articles")} - Marek Święchowicz`}
        description={t(
          "blog_intro",
          "I will publish posts here about testing, automation, and day-to-day quality engineering work."
        )}
      />
      <TransitionEffect skipEntry={skipEntry} skipExit={skipExit} />
      <main className="flex w-full items-center justify-center text-dark dark:text-light">
        <Layout>
          <AnimatedText
            className="mb-16 text-4xl md:text-7xl lg:text-8xl"
            text={t("blog_header")}
          />

          {articles.length === 0 ? (
            <section className="w-full rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:border-light dark:bg-dark">
              <p className="mb-4 text-base md:text-lg">{t("blog_intro")}</p>
              <p className="text-sm text-dark/75 dark:text-light/75">
                {t("blog_empty_state")}
              </p>
            </section>
          ) : (
            <div className="flex flex-col gap-8">
              {articles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <article className="group w-full rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:border-light dark:bg-dark cursor-pointer hover:bg-dark hover:text-light dark:hover:bg-light dark:hover:text-dark transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full border border-primary text-primary group-hover:border-primaryDark group-hover:text-primaryDark transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
                    <p className="text-base text-dark/75 dark:text-light/75 group-hover:text-light/75 dark:group-hover:text-dark/75 mb-4">
                      {article.description}
                    </p>
                    <time className="text-sm text-dark/50 dark:text-light/50 group-hover:text-light/50 dark:group-hover:text-dark/50">
                      {new Date(article.date).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Layout>
      </main>
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || "en";
  const articles = getAllArticles(locale);

  return {
    props: {
      articles,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
