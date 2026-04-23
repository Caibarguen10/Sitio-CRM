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

  createOpportunity(opportunity: CreateOpportunityDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.apiUrl, opportunity);
  }
}
