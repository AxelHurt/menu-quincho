export interface MenuItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  category_id: number;
  is_available: boolean; // <-- Nuevo campo
}

export interface Category {
  id: number;
  name: string;
  type: "comida" | "bebida";
}
