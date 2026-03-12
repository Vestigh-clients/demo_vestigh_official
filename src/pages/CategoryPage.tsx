import { useParams, Link } from "react-router-dom";
import { getProductsByCategory, categoryLabels, categoryDescriptions, type Category } from "@/data/products";
import { categoryImages } from "@/data/images";
import ProductCard from "@/components/ProductCard";

const validCategories: Category[] = ["hair-care", "mens-fashion", "womens-fashion", "bags", "shoes"];

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug as Category;

  if (!validCategories.includes(category)) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Category Not Found</h1>
        <Link to="/shop" className="font-body text-accent hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const products = getProductsByCategory(category);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={categoryImages[category]}
          alt={categoryLabels[category]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-card mb-3">
              {categoryLabels[category]}
            </h1>
            <p className="font-body text-card/70 max-w-md mx-auto">
              {categoryDescriptions[category]}
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
