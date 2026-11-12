export interface Product {
  id: string;
  name: string;
  type: string;
  price: string;
  description: string;
  image: string;
  status: "available" | "coming_soon" | "pre_order";
  features?: string[];
  link?: string;
  createdAt?: string;
}

export interface PortfolioItem {
  id: string;
  no: string;
  title: string;
  category: string;
  discipline: "web" | "multimedia" | "design" | "event";
  image: string;
  year: string;
  client?: string;
  summary: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  featured?: boolean;
}
