export interface Villa {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  beds: number;
  baths: number;
  features: string[];
  accentColor: string;
  airbnb: string;
  icalUrl?: string;
}

export const WHATSAPP_URL =
  "https://wa.me/6282146574879?text=Hi%2C%20I%E2%80%99d%20like%20to%20check%20availability%20and%20the%20best%20direct%20rate%20for%20your%20villas%20in%20Bali.";

export function villaWhatsappUrl(villa: Villa) {
  return `https://wa.me/6282146574879?text=Hi%2C%20I%E2%80%99d%20like%20to%20check%20availability%20and%20the%20best%20direct%20rate%20for%20${encodeURIComponent(villa.name)}%20in%20${encodeURIComponent(villa.location)}.`;
}

export function villaHeroImage(villa: Villa) {
  return `/villas/villa-${villa.slug}/hero.jpg`;
}

export const villas: Villa[] = [
  {
    slug: "vittoria",
    name: "Villa Vittoria",
    location: "Seminyak",
    tagline: "Spacious, central, and designed for groups.",
    description:
      "A spacious six-bedroom villa designed for groups, families, and shared experiences in the heart of Seminyak. Set in a quiet area yet close to restaurants, shops, and the beach, it offers the perfect balance between privacy and convenience.",
    beds: 6,
    baths: 6,
    features: [
      "6 Ensuite Bedrooms",
      "Large Private Pool",
      "Spacious Living & Dining Area",
      "85\" Smart TV & Sound System in Living Room",
      "55\" Smart TV in Every Bedroom",
      "High-Speed WiFi",
      "Central Seminyak Location",
    ],
    accentColor: "#c9a96e",
    airbnb: "https://www.airbnb.co.uk/rooms/581864799939880567",
    icalUrl:
      "https://www.airbnb.com.au/calendar/ical/581864799939880567.ics?t=6ffc1e561e2c498d899c0d03f7171364",
  },
  {
    slug: "lumira",
    name: "Villa Lumira",
    location: "Petitenget",
    tagline: "Balinese charm meets modern comfort.",
    description:
      "A refined four-bedroom villa blending traditional Balinese charm with modern comfort. Recently renovated and located in a secure private complex, it offers a peaceful retreat close to Petitenget's top spots.",
    beds: 4,
    baths: 4,
    features: [
      "4 Ensuite Bedrooms",
      "Private Pool & Sun Deck",
      "Semi-Open Living Space",
      "75\" Smart TV in Living Room",
      "Smart TVs in Bedrooms",
      "High-Speed WiFi",
      "24/7 Security",
    ],
    accentColor: "#5a8a7a",
    airbnb: "https://www.airbnb.co.uk/rooms/1173027803281523078",
    icalUrl:
      "https://www.airbnb.com.au/calendar/ical/1173027803281523078.ics?t=696716cc80b741b6ae0e9be2af9918d6",
  },
  {
    slug: "salty",
    name: "Villa Salty",
    location: "Seminyak",
    tagline: "Design, comfort, and a prime location.",
    description:
      "A modern designer villa combining clean architecture with a warm tropical atmosphere. Located in central Seminyak, it offers a fully enclosed living space with comfort and privacy.",
    beds: 3,
    baths: 3,
    features: [
      "3 Bedrooms with Ensuite Bathrooms",
      "Private Pool",
      "Fully Air-Conditioned Living Room",
      "65\" Smart TV & Sound System in Living Room",
      "55\" Smart TV in Master Bedroom",
      "High-Speed WiFi",
      "Prime Seminyak Location",
    ],
    accentColor: "#6b8fa3",
    airbnb: "https://www.airbnb.co.uk/rooms/21816459",
    icalUrl:
      "https://www.airbnb.com.au/calendar/ical/21816459.ics?t=f90fbf33be464e04b930281ab584d47c",
  },
  {
    slug: "lux",
    name: "Villa Lux",
    location: "Petitenget",
    tagline: "Intimate, elegant, open-air living.",
    description:
      "An elegant two-bedroom villa offering a classic open-air Bali living experience. Set in a secure complex, it combines intimacy, style, and a central location close to the beach and restaurants.",
    beds: 2,
    baths: 2,
    features: [
      "2 Ensuite Bedrooms",
      "Private Pool",
      "Open Living Area with Sound System",
      "Smart TVs in Every Bedroom",
      "Elegant Interior Design",
      "High-Speed WiFi",
      "Close to Beach & Restaurants",
    ],
    accentColor: "#8a7a6a",
    airbnb: "https://www.airbnb.co.uk/rooms/1007160083731851693",
    icalUrl:
      "https://www.airbnb.com.au/calendar/ical/1007160083731851693.ics?t=a7cb143eb5c74b18b117f4ce92515387",
  },
  {
    slug: "aurea",
    name: "Villa Aurea",
    location: "Canggu",
    tagline: "Mediterranean touches in the heart of Canggu.",
    description:
      "A stylish three-bedroom villa blending Mediterranean touches with tropical Bali design. Located in the heart of Canggu, close to cafés, gyms, and the beach.",
    beds: 3,
    baths: 3,
    features: [
      "3 Ensuite Bedrooms",
      "Private Pool",
      "Enclosed Living Space with AC",
      "65\" Smart TV in Living Room",
      "Smart TVs in Every Bedroom",
      "Modern Kitchen & Design",
      "Central Canggu Location",
    ],
    accentColor: "#b8860b",
    airbnb: "https://www.airbnb.co.uk/rooms/1282620047333334876",
    icalUrl:
      "https://www.airbnb.com.au/calendar/ical/1282620047333334876.ics?t=f0be0a7197cd4f6cafce7819538ffed8",
  },
];