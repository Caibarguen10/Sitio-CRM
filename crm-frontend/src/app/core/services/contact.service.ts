import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Contact, CreateContactDto } from '../models/contact.model';
import { ApiResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  getContactsByClient(clientId: number): Observable<ApiResponse<Contact[]>> {
    return this.http.get<ApiResponse<Contact[]>>(`${this.apiUrl}/client/${clientId}`);
  }

  createContact(contact: CreateContactDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.apiUrl, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
