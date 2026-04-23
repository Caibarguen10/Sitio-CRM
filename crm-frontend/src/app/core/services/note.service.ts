import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Note, CreateNoteDto } from '../models/note.model';
import { ApiResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  // GET /api/notes/client/{clientId} NO existe en el backend
  // getNotesByClient(clientId: number): Observable<ApiResponse<Note[]>> {
  //   return this.http.get<ApiResponse<Note[]>>(`${this.apiUrl}/client/${clientId}`);
  // }

  createNote(note: CreateNoteDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(this.apiUrl, note);
  }

  // DELETE no está disponible en el backend actual
  // deleteNote(id: number): Observable<any> {
  //   return this.http.delete(`${this.apiUrl}/${id}`);
  // }
}
