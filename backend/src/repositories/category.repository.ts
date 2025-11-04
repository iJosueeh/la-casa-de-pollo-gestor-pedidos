import { supabase } from '@config/supabase';
import { Category } from '@backendTypes/category.types';

export const categoryRepository = {
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categorias')
      .select('*');

    if (error) {
      console.error('Error fetching categories from Supabase:', error);
      throw new Error('Could not fetch categories');
    }
    return data as Category[];
  },

  async getById(id: string): Promise<Category | null> {
    const { data, error } = await supabase.from('categorias').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Category | null;
  },
};