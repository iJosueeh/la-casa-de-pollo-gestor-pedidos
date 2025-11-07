import React, { useState } from 'react';
import { Modal } from '@/features/admin/components/Modal'; 
import { Input } from '@/shared/components/iu';
import { Button } from '@/shared/components/iu';
import { useNotificationContext } from '@/shared/context/NotificationContext';
import { apiClient } from '@/shared/utils/apiClient';

interface BackendClient {
  idcliente: number;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
}

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientConfirmed: (clientInfo: { clientId: number; nombrecliente: string; direccion?: string; notas?: string; metodoPago: string; }) => void;
}

export const ClientFormModal: React.FC<ClientFormModalProps> = ({ isOpen, onClose, onClientConfirmed }) => {
  const { showNotification } = useNotificationContext();
  const [clientDetails, setClientDetails] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    notas: '',
    metodoPago: 'Efectivo',
  });
  const [nombreError, setNombreError] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClientDetails(prev => ({ ...prev, [name]: value }));

    if (name === 'nombre' && nombreError) setNombreError(undefined);
    if (name === 'email' && emailError) setEmailError(undefined);
  };

  const handleConfirm = async () => {
    let hasError = false;
    if (!clientDetails.nombre) {
      setNombreError('El nombre del cliente es requerido.');
      hasError = true;
    } else {
      setNombreError(undefined);
    }
    if (!clientDetails.email) {
      setEmailError('El email del cliente es requerido.');
      hasError = true;
    } else {
      setEmailError(undefined);
    }

    if (hasError) {
      return;
    }

    setIsLoading(true);
    try {
      const client = await apiClient.post<BackendClient>('/api/clients', {
        nombre: clientDetails.nombre,
        email: clientDetails.email,
        telefono: clientDetails.telefono,
        direccion: clientDetails.direccion,
      });

      onClientConfirmed({
        clientId: client.idcliente,
        nombrecliente: client.nombre,
        direccion: client.direccion,
        notas: clientDetails.notas,
        metodoPago: clientDetails.metodoPago,
      });
      showNotification('Cliente confirmado con éxito.', 'success');
      onClose();
    } catch (error: unknown) {
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
            error={nombreError}
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
            error={emailError}
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
        <div className="mb-4">
          <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700">Método de Pago</label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={clientDetails.metodoPago}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Efectivo</option>
            <option>Yape</option>
            <option>Plin</option>
            <option>Tarjeta de Crédito/Débito</option>
            <option>Transferencia Bancaria</option>
          </select>
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
          gradient={true}
          className="w-full font-bold py-2 px-4 rounded"
        >
          {isLoading ? 'Confirmando...' : 'Confirmar Cliente y Pedido'}
        </Button>
      </div>
    </Modal>
  );
};
