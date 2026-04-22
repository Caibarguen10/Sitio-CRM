export interface Note {
  id: number;
  content: string;
  clientId: number;
  createdAt: string;
  createdBy: string;
}

export interface CreateNoteDto {
  content: string;
  clientId: number;
}
