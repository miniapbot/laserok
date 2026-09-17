export interface Product {
  id: number;
  sku: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
  attributes: Record<string, string>;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}