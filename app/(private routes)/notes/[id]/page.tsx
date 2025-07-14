import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const shortDescription =
    note.content.length > 150
      ? `${note.content.slice(0, 147)}...`
      : note.content;

  return {
    title: `NoteHub | ${note.title}`,
    description: shortDescription.replace(/'/g, '&#39;'),
    openGraph: {
      type: 'article',
      url: `https://09-auth-sigma.vercel.app/note/${id}`,
      title: `NoteHub | ${note.title}`,
      description: shortDescription.replace(/'/g, '&#39;'),
      siteName: 'NoteHub',
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  };
}

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
