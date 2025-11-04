import { supabase } from '@config/supabase';
import { Usuario } from '@backendTypes/usuario.types';

export const authRepository = {
  async findByEmail(email: string): Promise<Usuario | null> {
    const { data, error } = await supabase
      .from('usuario') 
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error finding user by email:', error);
      throw new Error('Could not find user by email');
    }
    return data as Usuario | null;
  },
};