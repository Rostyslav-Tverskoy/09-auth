import type { Note } from '@/types/note';
import type { Response } from '@/types/response';
import { nextServer } from './api';
import { User } from '@/types/user';

interface CreateNoteData {
  title: string;
  content?: string;
  tag: Note['tag'];
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface PatchedUser {
  email: string;
  username: string;
}

interface MessageResponse {
  message: string;
}

export async function fetchNotes(
  searchText: string,
  pageNumber: number,
  tag: string | undefined
): Promise<Response> {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = {
    page: pageNumber,
    perPage: 10,
  };

  if (searchText) {
    params.search = searchText;
  }

  if (tag) {
    params.tag = tag;
  }

  const response = await nextServer.get<Response>('/notes', { params });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await nextServer.post<Note>('/notes', noteData);
  return response.data;
}

export async function deleteNote(id: number): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(user: AuthCredentials): Promise<User> {
  const response = await nextServer.post<User>('/auth/register', user);
  return response.data;
}

export async function signIn(user: AuthCredentials): Promise<User> {
  const response = await nextServer.post<User>('/auth/login', user);
  return response.data;
}

export async function logOut(): Promise<MessageResponse> {
  const response = await nextServer.post<MessageResponse>('/auth/logout');
  return response.data;
}

export async function checkSession(): Promise<MessageResponse> {
  const response = await nextServer.get<MessageResponse>('/auth/session');
  return response.data;
}

export async function refreshSession(): Promise<MessageResponse> {
  const response = await nextServer.get<MessageResponse>('/auth/refresh');
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>('/users/me');
  return response.data;
}

export async function changeUser(user: PatchedUser): Promise<User> {
  const response = await nextServer.patch<User>('/users/me', user);
  return response.data;
}
