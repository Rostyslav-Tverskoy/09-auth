import axios from 'axios';
import { type Note } from '../types/note';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
// http://localhost:3000/api

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search.trim() && { search: search.trim() }),
      ...(tag && { tag: tag.trim() }),
    },
  });
  return res.data;
};

export const createNote = async (note: Note): Promise<Note> => {
  const res = await api.post<Note>('/notes', note);
  return res.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};