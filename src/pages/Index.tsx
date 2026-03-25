import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Globe, Leaf, ShieldCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { contentConfig } from "@/config/content.config";
import { useCart } from "@/contexts/CartContext";
import { useStorefrontConfig } from "@/contexts/StorefrontConfigContext";
import { formatPrice } from "@/lib/price";
import { getAllProducts, getFeaturedProducts } from "@/services/productService";
import { getPrimaryImage, getStockQuantity, isInStock, type Product } from "@/types/product";

const excellenceIconMap = {
  globe: Globe,
  shield: ShieldCheck,
  leaf: Leaf,
} as const;

type CuratedCategoryCard = {
  slug: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
};

interface RecommendedProductCardProps {
  product: Product;
  addToCartLabel: string;
  selectOptionsLabel: string;
  onProductAction: (product: Product) => void;
}

const RecommendedProductCard = ({
  product,
  addToCartLabel,
  selectOptionsLabel,
  onProductAction,
}: RecommendedProductCardProps) => {
  const imageUrl = getPrimaryImage(product);
  const categoryLabel = product.categories?.name?.trim() || "Curated Selection";
  const isOutOfStock = !isInStock(product);
  const requiresVariantSelection = product.has_variants === true;
  const actionLabel = isOutOfStock ? "Out of Stock" : requiresVariantSelection ? selectOptionsLabel : addToCartLabel;

  return (
    <article className="w-[320px] flex-shrink-0 md:w-[400px]">
      <div className="mb-6">
        <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface-strong)]">
          <Link to={`/shop/${product.slug}`} className="block h-full" aria-label={product.name}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-[var(--theme-surface-strong)]" aria-hidden="true" />
            )}
          </Link>

          <div className="absolute bottom-0 left-0 w-full translate-y-full p-5 transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
            <button
              type="button"
              disabled={isOutOfStock}
              onClick={() => onProductAction(product)}
              className="w-full rounded-[var(--theme-radius-md)] bg-[var(--theme-primary)] px-5 py-4 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--theme-primary-foreground)] transition-colors hover:bg-[var(--theme-nav-solid-bg)] disabled:cursor-not-allowed disabled:bg-[var(--theme-border)] disabled:text-[var(--theme-text-muted)]"
            >
              {actionLabel}
            </button>
          </div>
        </div>

        <div className="grid min-h-[126px] content-start pt-1">
          <h3 className="min-h-[3.4rem] font-display text-[1.35rem] font-bold tracking-tight text-[var(--theme-primary)]">
            {product.name}
          </h3>
          <p className="mt-2 inline-flex w-fit rounded-[var(--theme-radius-sm)] bg-[var(--theme-nav-solid-bg)] px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.12em] text-[var(--theme-nav-solid-interactive)]">
            {categoryLabel}
          </p>
          <p className="mt-3 font-body text-[0.95rem] text-[var(--theme-text-muted)]">{formatPrice(product.price)}</p>
        </div>
      </div>
    </article>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { storefrontConfig } = useStorefrontConfig();
  const { addToCart } = useCart();

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isRecommendationsLoading, setIsRecommendationsLoading] = useState(true);
  const [innerCircleEmail, setInnerCircleEmail] = useState("");

  const enabledCategories = useMemo(() => {
    const seen = new Set<string>();

    return storefrontConfig.categories
      .filter((category) => category.enabled)
      .map((category) => ({
        ...category,
        slug: category.slug.trim().toLowerCase(),
        imageUrl: category.imageUrl.trim(),
      }))
      .filter((category) => category.slug.length > 0)
      .filter((category) => {
        if (seen.has(category.slug)) {
          return false;
        }

        seen.add(category.slug);
        return true;
      });
  }, [storefrontConfig.categories]);

  const categoryBySlug = useMemo(() => {
    return Object.fromEntries(enabledCategories.map((category) => [category.slug, category]));
  }, [enabledCategories]);

  const curatedCategories = useMemo(() => {
    const configuredItems = contentConfig.home.curatorSelection.items
      .map((item) => {
        const category = categoryBySlug[item.slug];

        if (!category) {
          return null;
        }

        return {
          slug: category.slug,
          title: item.title,
          subtitle: item.subtitle,
          ctaLabel: item.ctaLabel,
          imageUrl: item.imageUrl?.trim() || category.imageUrl,
          imageAlt: item.imageAlt?.trim() || category.name,
          href: `/category/${encodeURIComponent(category.slug)}`,
        } satisfies CuratedCategoryCard;
      })
      .filter((item): item is CuratedCategoryCard => Boolean(item));

    const configuredSlugs = new Set(configuredItems.map((item) => item.slug));
    const fallbackItems = enabledCategories
      .filter((category) => !configuredSlugs.has(category.slug))
      .map(
        (category) =>
          ({
            slug: category.slug,
            title: category.name,
            imageUrl: category.imageUrl,
            imageAlt: category.name,
            href: `/category/${encodeURIComponent(category.slug)}`,
          }) satisfies CuratedCategoryCard,
      );

    return [...configuredItems, ...fallbackItems].slice(0, 5);
  }, [categoryBySlug, enabledCategories]);

  useEffect(() => {
    let isActive = true;

    const loadRecommendedProducts = async () => {
      setIsRecommendationsLoading(true);

      try {
        const featured = (await getFeaturedProducts()) ?? [];

        if (featured.length > 0) {
          if (isActive) {
            setFeaturedProducts(featured.slice(0, 8));
          }
          return;
        }

        const fallbackProducts = (await getAllProducts()) ?? [];
        if (isActive) {
          setFeaturedProducts(fallbackProducts.slice(0, 8));
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to load homepage recommendations", error);
        }

        if (isActive) {
          setFeaturedProducts([]);
        }
      } finally {
        if (isActive) {
          setIsRecommendationsLoading(false);
        }
      }
    };

    void loadRecommendedProducts();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const hash = location.hash.replace(/^#/, "");
    if (!hash) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [location.hash]);

  const scrollRecommendationBy = (direction: "previous" | "next") => {
    const carouselElement = carouselRef.current;
    if (!carouselElement) {
      return;
    }

    const firstCard = carouselElement.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard?.offsetWidth ?? 400;
    const scrollAmount = cardWidth + 32;

    carouselElement.scrollBy({
      left: direction === "previous" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleProductAction = (product: Product) => {
    if (product.has_variants === true) {
      navigate(`/shop/${product.slug}`);
      return;
    }

    if (!isInStock(product)) {
      return;
    }

    addToCart({
      product_id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.categories?.name?.trim() || "Product",
      price: product.price,
      compare_at_price: product.compare_at_price ?? null,
      image_url: getPrimaryImage(product),
      image_alt: product.name,
      sku: product.sku ?? null,
      stock_quantity: getStockQuantity(product),
      variant_id: null,
      variant_label: null,
    });
  };

  const goToRecommendation = (direction: "previous" | "next") => {
    if (featuredProducts.length <= 1) {
      return;
    }

    scrollRecommendationBy(direction);
  };

  const handleInnerCircleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!innerCircleEmail.trim()) {
      return;
    }

    toast(contentConfig.home.innerCircle.pendingMessage);
    setInnerCircleEmail("");
  };

  const hero = contentConfig.home.hero;
  const excellence = contentConfig.home.excellence;
  const recommendations = contentConfig.home.recommendations;
  const innerCircle = contentConfig.home.innerCircle;
  const featureCard = curatedCategories[0] ?? null;
  const supportingCards = curatedCategories.slice(1);

  return (
    <div className="bg-[var(--theme-canvas)] text-[var(--theme-text-primary)]">
      <section className="relative min-h-[78svh] overflow-hidden md:min-h-[920px]">
        <div className="absolute inset-0">
          <img src={hero.backgroundImageUrl} alt={hero.backgroundImageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,16,29,0.8)_0%,rgba(5,16,29,0.05)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-[1600px] items-center px-6 py-20 md:min-h-[920px] lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-6 font-body text-[11px] uppercase tracking-[0.32em] text-[rgba(216,227,246,0.9)]">{hero.eyebrow}</p>
            <h1 className="max-w-[900px] font-display text-[3.5rem] font-bold leading-[0.98] tracking-[-0.05em] text-white md:text-[5.5rem]">
              {hero.heading.split(" ").slice(0, 3).join(" ")}
              <br />
              {hero.heading.split(" ").slice(3).join(" ")}
            </h1>
            <p className="mt-8 max-w-[620px] font-body text-lg leading-8 text-[rgba(216,227,246,0.82)]">{hero.subtext}</p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-[var(--theme-radius-md)] bg-[linear-gradient(135deg,var(--theme-primary),var(--theme-nav-solid-bg))] px-10 py-4 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--theme-primary-foreground)] transition-transform duration-200 hover:scale-[0.98]"
              >
                {hero.primaryCta.text}
              </Link>
              <Link
                to={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-[var(--theme-radius-md)] border border-white/20 px-10 py-4 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
              >
                {hero.secondaryCta.text}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="curated-selection" className="px-6 py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-16 md:mb-20">
            <h2 className="font-display text-[2.5rem] font-bold tracking-[-0.04em] text-[var(--theme-primary)] md:text-[3.25rem]">
              {contentConfig.home.curatorSelection.title}
            </h2>
            <div className="mt-4 h-[3px] w-24 bg-[var(--theme-nav-solid-bg)]" />
          </div>

          {featureCard ? (
            <div className="grid gap-6 md:grid-cols-4 md:grid-rows-2 md:h-[800px]">
              <Link
                to={featureCard.href}
                className="group relative overflow-hidden rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface-alt)] md:col-span-2 md:row-span-2"
              >
                <img
                  src={featureCard.imageUrl}
                  alt={featureCard.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,16,29,0.02)_0%,rgba(5,16,29,0.62)_100%)]" />
                <div className="absolute bottom-8 left-8 right-8 text-white md:bottom-10 md:left-10 md:right-10">
                  <h3 className="font-display text-[2rem] font-bold tracking-[-0.03em]">{featureCard.title}</h3>
                  {featureCard.subtitle ? (
                    <p className="mt-2 font-body text-[15px] text-white/80">{featureCard.subtitle}</p>
                  ) : null}
                  {featureCard.ctaLabel ? (
                    <span className="mt-4 inline-flex border-b border-white/70 pb-1 font-body text-[11px] uppercase tracking-[0.16em] text-white">
                      {featureCard.ctaLabel}
                    </span>
                  ) : null}
                </div>
              </Link>

              {supportingCards.map((card) => (
                <Link
                  key={card.slug}
                  to={card.href}
                  className="group relative overflow-hidden rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface-alt)]"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[rgba(15,15,15,0.2)] transition-colors group-hover:bg-[rgba(15,15,15,0.35)]" />
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                    <h3 className="font-display text-[1.85rem] font-bold tracking-[-0.03em] text-white">{card.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[var(--theme-surface-alt)] py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
          <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface-strong)]">
                <img src={excellence.imageUrl} alt={excellence.imageAlt} className="h-full w-full object-cover grayscale" loading="lazy" />
              </div>
              <div className="absolute -bottom-10 -right-10 hidden w-72 bg-[var(--theme-nav-solid-bg)] p-10 md:block">
                <p className="font-body text-[11px] uppercase tracking-[0.24em] text-[rgba(216,227,246,0.78)]">{excellence.signatureEyebrow}</p>
                <h3 className="mt-4 font-display text-[2rem] font-bold tracking-[-0.03em] text-white">{excellence.signatureTitle}</h3>
              </div>
            </div>

            <div>
              <h2 className="font-display text-[2.8rem] font-bold tracking-[-0.04em] text-[var(--theme-primary)] md:text-[3.4rem]">
                {excellence.title}
              </h2>
              <p className="mt-8 max-w-[640px] font-body text-lg leading-8 text-[var(--theme-accent)]">{excellence.description}</p>

              <div className="mt-12 grid gap-8">
                {excellence.items.map((item) => {
                  const Icon = excellenceIconMap[item.icon];

                  return (
                    <div key={item.title} className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--theme-primary)] text-[var(--theme-primary-foreground)]">
                        <Icon size={20} strokeWidth={1.9} />
                      </div>
                      <div>
                        <h3 className="font-body text-[1.2rem] font-semibold text-[var(--theme-primary)]">{item.title}</h3>
                        <p className="mt-2 font-body text-[15px] leading-7 text-[var(--theme-text-muted)]">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recommended" className="overflow-hidden px-6 py-24 md:py-32 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[2.5rem] font-bold tracking-[-0.04em] text-[var(--theme-primary)] md:text-[3rem]">
                {recommendations.title}
              </h2>
              <p className="mt-3 font-body text-[15px] text-[var(--theme-accent)]">{recommendations.description}</p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => goToRecommendation("previous")}
                disabled={featuredProducts.length <= 1}
                aria-label="Previous recommendation"
                className="flex h-12 w-12 items-center justify-center rounded-[var(--theme-radius-md)] border border-[rgba(197,198,204,0.6)] text-[var(--theme-primary)] transition-colors hover:bg-[var(--theme-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={20} strokeWidth={1.7} />
              </button>
              <button
                type="button"
                onClick={() => goToRecommendation("next")}
                disabled={featuredProducts.length <= 1}
                aria-label="Next recommendation"
                className="flex h-12 w-12 items-center justify-center rounded-[var(--theme-radius-md)] border border-[rgba(197,198,204,0.6)] text-[var(--theme-primary)] transition-colors hover:bg-[var(--theme-primary)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={20} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          {isRecommendationsLoading ? (
            <div className="flex gap-8 overflow-hidden pb-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`recommendation-skeleton-${index}`} className="w-[320px] flex-shrink-0 md:w-[400px]">
                  <div className="lux-product-shimmer aspect-[3/4] w-full rounded-[var(--theme-radius-lg)]" />
                  <div className="mt-5 space-y-3">
                    <div className="lux-product-shimmer h-5 w-2/3" />
                    <div className="lux-product-shimmer h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div ref={carouselRef} className="lux-hide-scrollbar flex gap-8 overflow-x-auto pb-6">
              {featuredProducts.map((product) => (
                <RecommendedProductCard
                  key={product.id}
                  product={product}
                  addToCartLabel={recommendations.addToCartLabel}
                  selectOptionsLabel={recommendations.selectOptionsLabel}
                  onProductAction={handleProductAction}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[var(--theme-radius-lg)] bg-[var(--theme-surface-alt)] px-8 py-12">
              <p className="font-body text-[15px] leading-7 text-[var(--theme-text-muted)]">{recommendations.emptyState}</p>
            </div>
          )}
        </div>
      </section>

      <section className="relative px-6 py-24 md:py-32 lg:px-8">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[var(--theme-radius-lg)]">
          <div className="relative">
            <img src={innerCircle.backgroundImageUrl} alt={innerCircle.backgroundImageAlt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[rgba(5,16,29,0.4)] backdrop-blur-[2px]" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="lux-glass-card my-8 w-full max-w-4xl rounded-[var(--theme-radius-lg)] px-8 py-12 text-center shadow-[0_32px_72px_rgba(5,16,29,0.18)] md:px-16 md:py-20">
              <h2 className="font-display text-[2.7rem] font-bold tracking-[-0.04em] text-[var(--theme-primary)] md:text-[3.3rem]">
                {innerCircle.title}
              </h2>
              <p className="mx-auto mt-6 max-w-[720px] font-body text-lg leading-8 text-[var(--theme-text-muted)]">{innerCircle.description}</p>

              <form onSubmit={handleInnerCircleSubmit} className="mx-auto mt-10 flex max-w-xl flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-1 text-left">
                  <label className="mb-2 block font-body text-[11px] uppercase tracking-[0.16em] text-[var(--theme-text-muted)]">
                    {innerCircle.inputLabel}
                  </label>
                  <input
                    type="email"
                    value={innerCircleEmail}
                    onChange={(event) => setInnerCircleEmail(event.target.value)}
                    placeholder={innerCircle.inputPlaceholder}
                    className="w-full border-b-2 border-[var(--theme-border)] bg-[var(--theme-surface-alt)] px-4 py-3 font-body text-[15px] text-[var(--theme-text-primary)] outline-none transition-colors placeholder:text-[var(--theme-text-muted)] focus:border-[var(--theme-primary)]"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-[var(--theme-radius-md)] bg-[var(--theme-primary)] px-8 py-3.5 font-body text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--theme-primary-foreground)] transition-colors hover:bg-[var(--theme-nav-solid-bg)]"
                >
                  {innerCircle.buttonLabel}
                </button>
              </form>

              <p className="mt-6 font-body text-sm text-[rgba(68,71,76,0.7)]">{innerCircle.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
