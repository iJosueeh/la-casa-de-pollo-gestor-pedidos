import { supabase } from '@config/supabase';
import { Product } from '@backendTypes/product.types';

export const productRepository = {
  async getAll(categoryId?: string): Promise<Product[]> {
    let query = supabase.from('producto').select('*, imageUrl:imgUrl');

    if (categoryId) {
      query = query.eq('categoria_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      throw new Error('Could not fetch products');
    }
    return data as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from('producto').select('*, imageUrl:imgUrl').eq('id', id).single();
    if (error) throw error;
    return data as Product | null;
  },
};