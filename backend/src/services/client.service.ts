import { clientRepository } from '@repositories/client.repository';
import { Client, CreateClientPayload } from '@backendTypes/client.types';

export const clientService = {
  async processNewClient(payload: CreateClientPayload): Promise<Client> {
    // Basic validation (can be expanded)
    if (!payload.nombre || !payload.email) {
      throw new Error('Client name and email are required');
    }

    // Check if client with this email already exists
    const existingClient = await clientRepository.findClientByEmail(payload.email);
    if (existingClient) {
      // Optionally, return existing client or throw an error
      // For now, let's just return the existing client if found
      return existingClient;
    }

    const newClient = await clientRepository.createClient(payload);
    return newClient;
  },
};
