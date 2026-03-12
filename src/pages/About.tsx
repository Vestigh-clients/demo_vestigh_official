const About = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">Our Story</h1>

      <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
        <p>
          <span className="font-display text-foreground font-semibold">Luxuriant</span> was born from a passion for luxury that doesn't compromise on quality or style. We believe that everyone deserves to look and feel extraordinary — from the clothes they wear to the care they give their hair.
        </p>

        <p>
          Our carefully curated collections span across men's and women's fashion, premium leather bags, designer footwear, and a range of natural hair care products that nourish from root to tip. Every product in our catalogue is selected with intention — ensuring it meets our high standards of craftsmanship, elegance, and sustainability.
        </p>

        <p>
          Based in Nigeria and delivering nationwide, Luxuriant is more than a brand — it's a movement toward accessible luxury. We're committed to making premium fashion and beauty products available to every corner of the country, with swift delivery and a seamless ordering experience through WhatsApp.
        </p>

        <p>
          Whether you're dressing for a boardroom meeting, a special occasion, or simply elevating your everyday look, Luxuriant has something for you. Welcome to a world where luxury meets simplicity.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-secondary rounded-2xl p-8">
          <h3 className="font-display text-3xl font-bold text-accent mb-2">500+</h3>
          <p className="font-body text-sm text-muted-foreground">Happy Customers</p>
        </div>
        <div className="bg-secondary rounded-2xl p-8">
          <h3 className="font-display text-3xl font-bold text-accent mb-2">50+</h3>
          <p className="font-body text-sm text-muted-foreground">Premium Products</p>
        </div>
        <div className="bg-secondary rounded-2xl p-8">
          <h3 className="font-display text-3xl font-bold text-accent mb-2">36</h3>
          <p className="font-body text-sm text-muted-foreground">States Delivered To</p>
        </div>
      </div>
    </div>
  );
};

export default About;
