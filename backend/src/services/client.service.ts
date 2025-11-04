import { clientRepository } from '@repositories/client.repository';
import { Client, CreateClientPayload } from '@backendTypes/client.types';

export const clientService = {
  async processNewClient(payload: CreateClientPayload): Promise<Client> {
    
    if (!payload.nombre || !payload.email) {
      throw new Error('Client name and email are required');
    }

    
    const existingClient = await clientRepository.findClientByEmail(payload.email);
    if (existingClient) {
      
      return existingClient;
    }

    const newClient = await clientRepository.createClient(payload);
    return newClient;
  },
};
