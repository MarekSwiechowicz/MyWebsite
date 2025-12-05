import { useRouter } from "next/router";

interface StructuredDataProps {
  type?: "Person" | "WebSite";
}

const StructuredData: React.FC<StructuredDataProps> = ({ type = "Person" }) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.marekswiechowicz.website";
  const locale = router.locale || "en";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Marek Święchowicz",
    jobTitle: "Quality Assurance Engineer",
    url: siteUrl,
    sameAs: [
      "https://github.com/MarekSwiechowicz",
      "https://www.linkedin.com/in/marekswiechowicz/",
    ],
    email: "marek.swiechowicz.linkedin@gmail.com",
    description:
      "Quality Assurance Engineer with expertise in automation, integration testing, and system reliability.",
    inLanguage: locale,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Marek Święchowicz",
    url: siteUrl,
    description:
      "Portfolio website of Marek Święchowicz, Quality Assurance Engineer",
    inLanguage: [locale, "en", "pl"],
  };

  const schema = type === "Person" ? personSchema : websiteSchema;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;

