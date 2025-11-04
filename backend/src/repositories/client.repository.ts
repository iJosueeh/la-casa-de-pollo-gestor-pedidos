import { supabase } from '@config/supabase';
import { Client, CreateClientPayload } from '@backendTypes/client.types';

export const clientRepository = {
  async createClient(clientData: CreateClientPayload): Promise<Client> {
    const { data, error } = await supabase
      .from('cliente')
      .insert(clientData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error creating client:', error);
      throw new Error('Could not create client');
    }
    return data as Client;
  },

  
  async findClientByEmail(email: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('cliente')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Supabase error finding client by email:', error);
      throw new Error('Could not find client by email');
    }
    return data as Client | null;
  },
};
