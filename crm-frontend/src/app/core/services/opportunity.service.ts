import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Opportunity, CreateOpportunityDto } from '../models/opportunity.model';
import { ApiResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private apiUrl = `${environment.apiUrl}/opportunities`;

  constructor(private http: HttpClient) {}

  // GET /api/opportunities/client/{clientId} NO existe en el backend
  // getOpportunitiesByClient(clientId: number): Observable<ApiResponse<Opportunity[]>> {
  //   return this.http.get<ApiResponse<Opportunity[]>>(`${this.apiUrl}/client/${clientId}`);
  // }

  createOpportunity(opportunity: CreateOpportunityDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.apiUrl, opportunity);
  }

  // DELETE no está disponible en el backend actual
  // deleteOpportunity(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
