export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;  // Requerido en backend
  position: string;  // Requerido en backend
  clientId: number;
  createdAt?: string;
  createdBy?: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone: string;  // Requerido en backend
  position: string;  // Requerido en backend
  clientId: number;
}
