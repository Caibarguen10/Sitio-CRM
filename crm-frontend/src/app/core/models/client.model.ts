export interface Client {
  id: number;
  fullName: string;
  documentNumber: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  createdBy: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}