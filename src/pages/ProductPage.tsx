import { useParams, Link } from "react-router-dom";
import { getProductById, formatPrice, getWhatsAppLink } from "@/data/products";
import { productImages } from "@/data/images";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop" className="font-body text-accent hover:underline">← Back to Shop</Link>
      </div>
    );
  }

  const image = productImages[product.id];

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/shop" className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft size={16} />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-muted">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover aspect-square"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <span className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
            {product.category.replace("-", " ")}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="font-body text-2xl font-bold text-accent mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="font-display text-lg font-semibold mb-4">Product Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 font-body text-sm text-muted-foreground">
                  <Check size={16} className="text-accent flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp Order */}
          <a
            href={getWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[hsl(142,70%,45%)] text-card px-8 py-4 rounded-lg font-body font-semibold text-base hover:bg-[hsl(142,70%,40%)] transition-colors"
          >
            <MessageCircle size={22} />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
