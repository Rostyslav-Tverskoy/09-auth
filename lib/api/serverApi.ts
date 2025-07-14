import { nextServer } from './api';
import { cookies } from 'next/headers';
import type { Response } from '@/types/response';
import { Note } from '@/types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response;
};

export async function fetchServerNotes(
  searchText: string,
  pageNumber: number,
  tag: string | undefined
): Promise<Response> {
  const cookieStore = await cookies();
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

  const response = await nextServer.get<Response>('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchServerNoteById(id: string) {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}
