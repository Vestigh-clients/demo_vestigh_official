import authPanelImage from "@/assets/hero-bg.jpg";

export interface ContentLink {
  label: string;
  href: string;
}

export interface HomeHeroConfig {
  eyebrow: string;
  heading: string;
  subtext: string;
  primaryCta: ContentLink;
  secondaryCta: ContentLink;
  backgroundImageUrl: string;
  backgroundImageAlt: string;
}

export interface HomeCuratorSelectionItemConfig {
  slug: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface HomeExcellenceItemConfig {
  icon: "globe" | "shield" | "leaf";
  title: string;
  description: string;
}

export interface HomeRecommendationsConfig {
  title: string;
  description: string;
  addToCartLabel: string;
  selectOptionsLabel: string;
  emptyState: string;
  initialActiveIndex: number;
}

export interface HomeInnerCircleConfig {
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  buttonLabel: string;
  disclaimer: string;
  pendingMessage: string;
  backgroundImageUrl: string;
  backgroundImageAlt: string;
}

export interface ContentConfig {
  navigation: {
    primaryLinks: ContentLink[];
  };
  home: {
    hero: HomeHeroConfig;
    curatorSelection: {
      title: string;
      items: HomeCuratorSelectionItemConfig[];
    };
    excellence: {
      title: string;
      description: string;
      signatureEyebrow: string;
      signatureTitle: string;
      imageUrl: string;
      imageAlt: string;
      items: HomeExcellenceItemConfig[];
    };
    recommendations: HomeRecommendationsConfig;
    innerCircle: HomeInnerCircleConfig;
  };
  footer: {
    description: string;
    shopLinks: ContentLink[];
    companyLinks: ContentLink[];
  };
  auth: {
    panelImageUrl: string;
    panelImageAlt: string;
  };
  about: {
    body: string;
    intro: string;
    stats: Array<{ value: string; label: string }>;
  };
}

export const contentConfig: ContentConfig = {
  navigation: {
    primaryLinks: [
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/#curated-selection" },
      { label: "Atelier", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  home: {
    hero: {
      eyebrow: "Est. 2024",
      heading: "Crafted for the Connoisseur",
      subtext:
        "An intentional fusion of artisanal mastery and digital precision. Discover a curated collection of objects that define the modern landscape of luxury.",
      primaryCta: {
        text: "Explore the Collection",
        href: "/shop",
      },
      secondaryCta: {
        text: "The Atelier Story",
        href: "/about",
      },
      backgroundImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUivcmjaY-Stjjtxj5CTh0W-lEF0iULnZIEE9X82kFP18Mw47OVwpreQE9DhmZXiJISxBEuQDZHcNIoJHDRSLSeehFWO8MudyDDeIi44ZnrGnoo6jnfIXrKP-ZbwzUjzoKf8jHapEawMKsh7UgjaW4jUu3BVQvV0grsJKhyW2lVopsgrWW2K_OZv0JrJHSXBLZ-HuYEjy7jqtdHMIxv9QDJLa8WeE9wnaRTaAjOK1ZtVd2TOWE7nexFf7Y4_TVt4NQBObY7la-CTY",
      backgroundImageAlt:
        "Cinematic shot of a minimalist luxury boutique interior with dark wood textures and soft directional lighting.",
    },
    curatorSelection: {
      title: "The Curator's Selection",
      items: [
        {
          slug: "mens-fashion",
          title: "Sartorial Tailoring",
          subtitle: "Architecture for the body.",
          ctaLabel: "View Category",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBBG1h51bbI5yK8ccST8s_jgJ5ckggNz0zUKM2FRbyTdLcBIAuPh_1LgmqTkR-Ygeoh41nAb_Mn1438Qjmu8Gv1Q3yCNLw6DvTVqGXjMujBLMsEst7WCw99GLYy4Ml_5u6tdEXQImxAYOqnGeWTq15QX9-daRLGyeyJbLxGye2Ten3kSB0P4XeFnnFs6-IWFlkSa3SCy-dkPlRHbE8vT8Ak52FQhZF-rrse3mdsluzV5mN-NKCsTL3VKhB2-JwTLu_TJA2ksN-rjYc",
          imageAlt:
            "Close-up of charcoal wool fabric with expert tailoring details and hand-stitched lapel on a bespoke jacket.",
        },
        {
          slug: "bags",
          title: "Artisan Bags",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuADrH3-V6hf82ZX3o2sWzme23Y7R_UaC7erpTDYbWa9rcYpx1MbaMBdvKxAzhnkpf5_-kHK8R8_TDmcphof_-v-NNl2oQsRm6WUhz3SqU5YkHrzIgDuWtRqWvIY72ZW92YWt8ZEOvJh0r8zGjupk3sbGOYTZetG7mDuJL9K0XVPp6nv43TlYibtUx8J1-fMxsWGK5G0NPpWV_It-dTfaTMZDcamyCBrGXHoqL_rrR8r6CBjrxPK4Pwosemxv--m5Lc-Ag4Fs-Kdbi4",
          imageAlt: "Exquisite leather handbag in deep navy blue resting on a white marble plinth.",
        },
        {
          slug: "womens-fashion",
          title: "Modern Muse",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA3IHivd6ouUEkswWO10qlzXXR-UAtPFbIc_G3p2D2HYqFZMQQrZVsfG40uJWxXOaZ7JGTftlNLxtkqC6uZm4KXzGBaYlwrYt5cqtmSWiDEmP-DcS2QhzJIyKLXJBaJg6-qfcz6JkO9wD-iPixfsWy2SkL2zNmejb82ta-IyO3ysqNqSaYqKif7y-_y2q5wSrG_ck1hOTHRc7VPOwPTGMY4WvjCtB0YQtFeelGQ4YAUkMw5NcLwekEDgrK0NoRGw1GPARmxvaeCylE",
          imageAlt: "Elegant woman in a white silk dress walking through a sunlit architectural courtyard.",
        },
        {
          slug: "shoes",
          title: "Footwear",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBiBy5xAWcdISuzRVaMakwXjpRvJvxqF17w0yxsB2yTC1zNDfb3KDKX22PeQiWO7dZUQluvS7qtSI-wTq6eyX5KHgUrq2MMXTm2q0Z5KWu9BygKU8l_fdik8xjAU4wpAfNT6UCDQJr3iiuL6Sp389ucMekO8du_i37OPx0ugBKz_ERH-W1O-_xoUUy5A3htLulZ9sforrofDvU_wSuo5XlIcc4pwdNvIcnARyeZWBm1Xgdo720ZD_Kukn8tUS6H3eT4mAL4OTt7uBk",
          imageAlt: "Handcrafted oxblood leather dress shoes on a slate-grey stone surface.",
        },
        {
          slug: "hair-care",
          title: "Apothecary",
          imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCEaugiU7PMj75S1t5jxUWu13QwJWO0GzHV0SP_B-SuqDdm9o3gWYg_6yN9CF0KUUW4QHerDUPNd_hG9Tgn2NCC8NIjr38kczWY31gixRi20F9vD8034xOeTplSOVeRxv4RLN-Exf9KOIbttmWR3Avehc8U3X7GQoQXNz1aZDUKlK8BsYmFcyq--XpM7HGvaCsymXpuac9-MxRtuFIsVG_2VxT75nay8z_Sch14VoLRV-9-IM8U0GoxAMUOPdWPhfkwG45tTj_ZYTU",
          imageAlt: "Amber glass fragrance and skincare bottles styled on clean limestone in soft morning light.",
        },
      ],
    },
    excellence: {
      title: "Our Promise to Excellence",
      description:
        "Every object curated for the atelier undergoes a rigorous vetting process. We don't just sell products; we archive artifacts of human ingenuity.",
      signatureEyebrow: "Since 2024",
      signatureTitle: "The Hallmarks of Mastery",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQNVIQR5zjbgBe_LxLx81GABEi0AsASFkfw5qe3BJFKzel74XqUROu1nbsUeKNqHhqXRqtqJyHfVWuIgvK_Y_snEX1m9ucXGDwZNkmR_jFq491eGSR4GEbNU0pHQkdubSsF-yg_OTXF9QlCTHRgCbJtIaWjufIxYoBWv0_4FYzevkKyI7Brc8pnhd3_ZzUHMbrX2rvXEcSk0iGS2YeRUpdppQljIKTa3URzg8rHOCMhFvqewJ4KGHZ6sksuRH2P-K5QJhVpgLeK8s",
      imageAlt: "An artisan's hands working leather with a needle and thread.",
      items: [
        {
          icon: "globe",
          title: "Global White-Glove Delivery",
          description: "Seamless logistics to 180 countries, handled with discretion and care.",
        },
        {
          icon: "shield",
          title: "Artisanal Certification",
          description: "Each piece includes a digital certificate of authenticity and provenance.",
        },
        {
          icon: "leaf",
          title: "Sustainable Legacy",
          description: "Materials chosen to age gracefully and methods shaped to honor the planet.",
        },
      ],
    },
    recommendations: {
      title: "Recommended for You",
      description: "Personalized selections based on your aesthetic profile.",
      addToCartLabel: "Add to Atelier",
      selectOptionsLabel: "Select Options",
      emptyState: "Featured products will appear here once the storefront catalog is populated.",
      initialActiveIndex: 0,
    },
    innerCircle: {
      title: "Join the Inner Circle",
      description:
        "Gain exclusive access to pre-market collections, bespoke virtual styling sessions, and the quarterly Atelier Almanac.",
      inputLabel: "Email Address",
      inputPlaceholder: "atelier@concierge.com",
      buttonLabel: "Subscribe",
      disclaimer: "Membership is subject to curator review. Expect an invitation within 24 hours.",
      pendingMessage: "Subscription capture is not connected in this demo yet.",
      backgroundImageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfrEjTF-QALLMWOvEIMvF0s7FzRWfG--FsddakeV51pQLv57D9xir3r1ZkYcc6M4K11-sEjeyPo3pnFZjOJ_oScME4bSt0s3aSA1xKMd7LcbEYs5z4oOPGnsh--Ea9AXZ8YSa_GQcKoorU0D62OSvymsB4V647bLI1GBZ_pZflvXRyN2fbQsiB2GA7YxvQgi6xurFJsaUQKYKkjgVrt-zK7rwuRsbjFR_S8gH8Me3vCYEj-w51drrjO75T-OcTFt1aFS_8XO_-Kkg",
      backgroundImageAlt: "Abstract macro shot of deep blue velvet fabric with rich shadows and luxurious texture.",
    },
  },
  footer: {
    description: "Objects, garments, and ritual essentials curated with a deliberate editorial eye.",
    shopLinks: [
      { label: "Hair Care", href: "/category/hair-care" },
      { label: "Men's Fashion", href: "/category/mens-fashion" },
      { label: "Women's Fashion", href: "/category/womens-fashion" },
      { label: "Bags", href: "/category/bags" },
      { label: "Shoes", href: "/category/shoes" },
    ],
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  auth: {
    panelImageUrl: authPanelImage,
    panelImageAlt: "Brand visual",
  },
  about: {
    body: "",
    intro: "is designed for modern stores that want polished branding and a seamless customer journey.",
    stats: [
      { value: "500+", label: "Happy Customers" },
      { value: "50+", label: "Premium Products" },
      { value: "36", label: "Regions Served" },
    ],
  },
};
