import { contentConfig } from "@/config/content.config";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";

const About = () => {
  const { storefrontConfig } = useStorefrontConfig();
  const defaultAboutText = `${storefrontConfig.storeName} is built to deliver a premium fashion shopping experience with curated collections and reliable service.`;
  const aboutText = contentConfig.about.body.trim() || defaultAboutText;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-20">
      <h1 className="mb-8 text-center font-display text-4xl font-bold md:text-5xl">Our Story</h1>

      <div className="space-y-6 font-body leading-relaxed text-muted-foreground">
        <p>
          <span className="font-display font-semibold text-foreground">{storefrontConfig.storeName}</span> {contentConfig.about.intro}
        </p>
        <p>{aboutText}</p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 text-center md:grid-cols-3">
        {contentConfig.about.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-secondary p-8">
            <h3 className="mb-2 font-display text-3xl font-bold text-accent">{stat.value}</h3>
            <p className="font-body text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
