import Layout from "@/components/Layout";
import { TransitionEffect } from "@/components/TransitionEffect";
import SEO from "@/components/SEO";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllArticles, getArticleBySlug, ArticleMeta } from "@/lib/articles";
import Link from "next/link";

type ArticlePageProps = {
  meta: ArticleMeta;
  mdxSource: MDXRemoteSerializeResult;
};

const ArticlePage = ({ meta, mdxSource }: ArticlePageProps) => {
  return (
    <>
      <SEO title={`${meta.title} - Marek Święchowicz`} description={meta.description} />
      <TransitionEffect />
      <main className="flex w-full items-center justify-center text-dark dark:text-light">
        <Layout>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-dark/60 dark:text-light/60 hover:text-primary dark:hover:text-primaryDark transition-colors mb-10"
            >
              ← Back to articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full border border-primary text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-4">{meta.title}</h1>

            <time className="text-sm text-dark/50 dark:text-light/50 block mb-12">
              {new Date(meta.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <article className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-dark dark:prose-headings:text-light
              prose-p:text-dark/80 dark:prose-p:text-light/80
              prose-a:text-primary dark:prose-a:text-primaryDark prose-a:no-underline hover:prose-a:underline
              prose-strong:text-dark dark:prose-strong:text-light
              prose-code:text-primary dark:prose-code:text-primaryDark
              prose-code:bg-dark/5 dark:prose-code:bg-light/5
              prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-dark dark:prose-pre:bg-light/5
              prose-pre:border prose-pre:border-dark/10 dark:prose-pre:border-light/10
              prose-pre:rounded-xl
              prose-li:text-dark/80 dark:prose-li:text-light/80
              prose-hr:border-dark/20 dark:prose-hr:border-light/20
            ">
              <MDXRemote {...mdxSource} />
            </article>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default ArticlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = getAllArticles();
  const paths = articles.map((a) => ({ params: { slug: a.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale || "en";
  const slug = context.params?.slug as string;
  const article = getArticleBySlug(slug);
  const mdxSource = await serialize(article.content);

  return {
    props: {
      meta: {
        slug: article.slug,
        title: article.title,
        date: article.date,
        description: article.description,
        tags: article.tags,
      },
      mdxSource,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
