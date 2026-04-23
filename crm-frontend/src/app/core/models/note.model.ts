export interface Note {
  id: number;
  note: string;  // Backend usa "note" no "content"
  clientId: number;
  createdAt: string;
  createdBy: string;
}

export interface CreateNoteDto {
  note: string;  // Backend usa "note" no "content"
  clientId: number;
}
