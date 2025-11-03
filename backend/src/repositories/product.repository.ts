import { supabase } from '@config/supabase';
import { Product } from '@backendTypes/product.types';

export const productRepository = {
  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Product | null;
  },
};