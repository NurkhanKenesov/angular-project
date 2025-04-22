export interface Category {
  id: number;
  name: string;
  parent_category?: number; // Optional parent category ID
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  phone_number: string;
  whatsapp_enabled: boolean;
  created_at: string;
  updated_at: string;
  category: Category;
  user: {
    id: number;
    username: string;
  };
  is_active: boolean;
} 