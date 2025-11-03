import { supabase } from '@config/supabase';
import { Product } from '@backendTypes/product.types';

export const productRepository = {
  async getAll(): Promise<Product[]> {
    console.log('Fetching all products from Supabase...');
    const { data, error } = await supabase.from('producto').select('*');
    if (error) {
      console.error('Supabase error in getAll:', error);
      throw error;
    }
    console.log('Supabase data in getAll:', data);
    return data as Product[];
  },

  async getById(id: string): Promise<Product | null> {
    const { data, error } = await supabase.from('producto').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Product | null;
  },
};