import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Client, ApiResponse, PagedResult } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getClients(page: number = 1, pageSize: number = 10, filters?: any): Observable<ApiResponse<PagedResult<Client>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters?.name) {
      params = params.set('name', filters.name);
    }
    if (filters?.email) {
      params = params.set('email', filters.email);
    }

    return this.http.get<ApiResponse<PagedResult<Client>>>(this.apiUrl, { params });
  }

  getClientById(id: number): Observable<ApiResponse<Client>> {
    return this.http.get<ApiResponse<Client>>(`${this.apiUrl}/${id}`);
  }

  createClient(client: Partial<Client>): Observable<ApiResponse<Client>> {
    return this.http.post<ApiResponse<Client>>(this.apiUrl, client);
  }

  updateClient(id: number, client: Partial<Client>): Observable<ApiResponse<Client>> {
    return this.http.put<ApiResponse<Client>>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}