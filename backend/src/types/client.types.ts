export interface Client {
  idcliente: number;
  nombre: string;
  telefono?: string;
  direccion?: string;
  email: string;
}

export interface CreateClientPayload {
  nombre: string;
  telefono?: string;
  direccion?: string;
  email: string;
}
