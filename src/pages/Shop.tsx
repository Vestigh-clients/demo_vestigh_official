import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Shop = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
        <p className="font-body text-muted-foreground max-w-lg mx-auto">
          Browse our complete range of luxury fashion and hair care products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
