import { useMemo, useState } from "react";
import { productImages } from "@/data/images";
import { products, type Category, type Product } from "@/data/products";
import ShopProductCard from "@/components/ShopProductCard";

type ShopFilter = "all" | Category;

const categoryOrder: Category[] = ["hair-care", "mens-fashion", "womens-fashion", "bags", "shoes"];

const filterItems: Array<{ label: string; value: ShopFilter }> = [
  { label: "All", value: "all" },
  { label: "Hair Care", value: "hair-care" },
  { label: "Men", value: "mens-fashion" },
  { label: "Women", value: "womens-fashion" },
  { label: "Bags", value: "bags" },
  { label: "Shoes", value: "shoes" },
];

const categoryNames: Record<Category, string> = {
  "hair-care": "Hair Care",
  "mens-fashion": "Men's Fashion",
  "womens-fashion": "Women's Fashion",
  "bags": "Bags",
  "shoes": "Shoes",
};

const editorialHeadlines: Record<Category, string> = {
  "hair-care": "Rituals for your most luxurious self.",
  "mens-fashion": "Dressed with intention. Built to last.",
  "womens-fashion": "Effortless elegance, every day.",
  "bags": "Carry something worth noticing.",
  "shoes": "Every step, considered.",
};

const bannerImageByCategory: Record<Category, string> = {
  "hair-care": productImages["hc-001"],
  "mens-fashion": productImages["mf-001"],
  "womens-fashion": productImages["wf-001"],
  "bags": productImages["bg-001"],
  "shoes": productImages["sh-001"],
};

const groupedProducts = products.reduce<Record<Category, Product[]>>(
  (acc, product) => {
    acc[product.category].push(product);
    return acc;
  },
  {
    "hair-care": [],
    "mens-fashion": [],
    "womens-fashion": [],
    "bags": [],
    "shoes": [],
  },
);

const renderProductRows = (items: Product[]) => {
  const rows: JSX.Element[] = [];
  let pointer = 0;
  let patternIndex = 0;

  while (pointer < items.length) {
    const rowItems = items.slice(pointer, pointer + 3);
    const key = `row-${patternIndex}-${pointer}`;
    const rowType = patternIndex % 4;

    if (rowType === 0 || rowType === 2) {
      rows.push(
        <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rowItems.map((product) => (
            <ShopProductCard key={product.id} product={product} size="regular" />
          ))}
        </div>,
      );
    } else if (rowType === 1) {
      rows.push(
        <div key={key} className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {rowItems[0] && (
            <div className="md:col-span-3">
              <ShopProductCard product={rowItems[0]} size="large" />
            </div>
          )}

          {rowItems.length > 1 && (
            <div className="md:col-span-2 flex flex-col gap-8">
              {rowItems.slice(1).map((product) => (
                <ShopProductCard key={product.id} product={product} size="small" />
              ))}
            </div>
          )}
        </div>,
      );
    } else {
      if (rowItems.length === 1) {
        rows.push(
          <div key={key} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3 md:col-start-3">
              <ShopProductCard product={rowItems[0]} size="large" />
            </div>
          </div>,
        );
      } else {
        const largeItem = rowItems[rowItems.length - 1];
        const stackedItems = rowItems.slice(0, rowItems.length - 1);

        rows.push(
          <div key={key} className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2 flex flex-col gap-8">
              {stackedItems.map((product) => (
                <ShopProductCard key={product.id} product={product} size="small" />
              ))}
            </div>

            {largeItem && (
              <div className="md:col-span-3">
                <ShopProductCard product={largeItem} size="large" />
              </div>
            )}
          </div>,
        );
      }
    }

    pointer += rowItems.length;
    patternIndex += 1;
  }

  return rows;
};

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState<ShopFilter>("all");

  const categoriesToShow = useMemo(
    () => (activeFilter === "all" ? categoryOrder : [activeFilter]),
    [activeFilter],
  );

  const visibleProductCount = useMemo(
    () => categoriesToShow.reduce((total, category) => total + groupedProducts[category].length, 0),
    [categoriesToShow],
  );

  return (
    <div className="container mx-auto px-4 py-14 md:py-16">
      <div className="text-center mb-8">
        <h1 className="font-display text-[42px] md:text-[52px] font-light italic leading-tight">Our Collection</h1>
      </div>

      <div className="mb-16 border-b border-[#d4ccc2] py-6 md:py-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2.5">
            {filterItems.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`border px-5 py-2.5 font-body text-[11px] font-light uppercase tracking-[0.1em] transition-colors duration-300 ${
                    isActive
                      ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F5F0E8] rounded-[2px]"
                      : "border-[#d4ccc2] text-foreground hover:border-foreground/40"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <p className="font-body text-[12px] font-light text-[#888888] md:text-right">
            Showing {visibleProductCount} products
          </p>
        </div>
      </div>

      <div className="space-y-20">
        {categoriesToShow.map((category, index) => {
          const categoryProducts = groupedProducts[category];
          const showDivider = index > 0;

          return (
            <section key={category} className="space-y-10">
              {showDivider ? (
                <div className="border-t border-[#d4ccc2] pt-10 pb-6">
                  <p className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-accent">
                    {categoryNames[category]}
                  </p>
                </div>
              ) : (
                <div className="pb-6">
                  <p className="font-body text-[10px] font-light uppercase tracking-[0.2em] text-accent">
                    {categoryNames[category]}
                  </p>
                </div>
              )}

              {showDivider && activeFilter === "all" && (
                <div className="relative left-1/2 right-1/2 min-h-[60vh] w-screen -translate-x-1/2 overflow-hidden">
                  <img
                    src={bannerImageByCategory[category]}
                    alt={categoryNames[category]}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />

                  <div className="relative z-10 flex min-h-[60vh] items-center">
                    <div className="max-w-[600px] px-6 md:px-0 md:pl-[80px]">
                      <p className="mb-4 font-body text-[11px] font-light uppercase tracking-[0.2em] text-accent">
                        {categoryNames[category]}
                      </p>
                      <h2 className="font-display text-[38px] md:text-[52px] font-light italic leading-[1.2] text-white">
                        {editorialHeadlines[category]}
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-10">{renderProductRows(categoryProducts)}</div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
