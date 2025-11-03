import React, { useState } from 'react';
import { Modal } from '@/features/admin/components/Modal'; // Reusing the generic Modal component
import { Input } from '@/shared/components/iu';
import { Button } from '@/shared/components/iu';
import { useNotificationContext } from '@/shared/context/NotificationContext';

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientConfirmed: (clientInfo: { clientId: number; nombrecliente: string; direccion?: string; notas?: string }) => void;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({ isOpen, onClose, onClientConfirmed }) => {
  const { showNotification } = useNotificationContext();
  const [clientDetails, setClientDetails] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    notas: '', // This will be the 'notas' for the order, not the client
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    if (!clientDetails.nombre || !clientDetails.email) {
      showNotification('Nombre y Email del cliente son requeridos.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      // First, try to create the client
      const response = await fetch('http://localhost:4000/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: clientDetails.nombre,
          email: clientDetails.email,
          telefono: clientDetails.telefono,
          direccion: clientDetails.direccion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear/buscar cliente');
      }

      const client = await response.json();

      // Now, pass the client info back to the parent component (CartView)
      onClientConfirmed({
        clientId: client.idcliente,
        nombrecliente: client.nombre,
        direccion: client.direccion,
        notas: clientDetails.notas, // Use the notes from the form for the order
      });
      showNotification('Cliente confirmado con éxito.', 'success');
      onClose();
    } catch (error: any) {
      console.error('Error confirming client:', error);
      showNotification(error.message || 'Error al confirmar cliente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Información del Cliente">
      <div className="p-4">
        <div className="mb-4">
          <Input
            label="Nombre Completo"
            name="nombre"
            value={clientDetails.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={clientDetails.email}
            onChange={handleChange}
            placeholder="Ej: juan.perez@example.com"
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="Teléfono"
            name="telefono"
            value={clientDetails.telefono}
            onChange={handleChange}
            placeholder="Ej: 987654321"
          />
        </div>
        <div className="mb-4">
          <Input
            label="Dirección"
            name="direccion"
            value={clientDetails.direccion}
            onChange={handleChange}
            placeholder="Ej: Av. Los Girasoles 123"
          />
        </div>
        <div className="mb-6">
          <Input
            label="Notas del Pedido"
            name="notas"
            value={clientDetails.notas}
            onChange={handleChange}
            placeholder="Ej: Sin cebolla, entregar en puerta 3"
          />
        </div>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Confirmando...' : 'Confirmar Cliente y Pedido'}
        </Button>
      </div>
    </Modal>
  );
};
