import { Request, Response } from 'express';
import { clientService } from '@services/client.service';
import { CreateClientPayload } from '@backendTypes/client.types';

export const clientController = {
  async createClient(req: Request, res: Response): Promise<void> {
    try {
      const clientPayload: CreateClientPayload = req.body;

      if (!clientPayload.nombre || !clientPayload.email) {
        res.status(400).json({ error: 'Client name and email are required' });
        return;
      }

      const newClient = await clientService.processNewClient(clientPayload);
      res.status(201).json(newClient);
    } catch (error: unknown) {
      console.error('Error in clientController.createClient:', error instanceof Error ? error.message : error);
      res.status(500).json({ error: 'Error interno del servidor al crear el cliente' });
    }
  },
};
