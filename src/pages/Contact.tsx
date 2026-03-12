import { MessageCircle, Phone, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-20 max-w-2xl">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">Get In Touch</h1>
      <p className="font-body text-muted-foreground text-center mb-12">
        We'd love to hear from you. Reach out through any of our channels.
      </p>

      <div className="space-y-6">
        <a
          href="https://wa.me/2348000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center flex-shrink-0">
            <MessageCircle size={22} className="text-card" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">WhatsApp</h3>
            <p className="font-body text-sm text-muted-foreground">+234 800 000 0000</p>
          </div>
        </a>

        <a
          href="tel:+2348000000000"
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Phone size={22} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Phone</h3>
            <p className="font-body text-sm text-muted-foreground">+234 800 000 0000</p>
          </div>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
            <Instagram size={22} className="text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">Instagram</h3>
            <p className="font-body text-sm text-muted-foreground">@luxuriant</p>
          </div>
        </a>

        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center flex-shrink-0">
            <span className="text-background font-body font-bold text-sm">TT</span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold">TikTok</h3>
            <p className="font-body text-sm text-muted-foreground">@luxuriant</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
