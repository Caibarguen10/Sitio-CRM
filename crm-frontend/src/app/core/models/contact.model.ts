export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  clientId: number;
  createdAt?: string;
  createdBy?: string;
}

export interface CreateContactDto {
  name: string;
  email: string;
  phone?: string;
  position?: string;
  clientId: number;
}
