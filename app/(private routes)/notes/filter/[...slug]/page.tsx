import type { Response } from '@/types/response';
import Notes from './Notes.client';
import type { Metadata } from 'next';
import { fetchServerNotes } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag = slug[0];
  const normalizedTag = tag === 'All' ? undefined : tag;

  return {
    title: `NoteHub | ${normalizedTag} category`,
    description: `Browse notes in the "${normalizedTag?.toLowerCase()} category`,
    openGraph: {
      type: 'website',
      url: `https://09-auth-sigma.vercel.app/filter/${normalizedTag}`,
      title: `NoteHub | ${normalizedTag?.toLowerCase()} category`,
      description: `Browse notes in the ${normalizedTag?.toLowerCase()} category`,
      siteName: 'NoteHub',
      images: [
        { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0];
  const normalizedTag = tag === 'All' ? undefined : tag;

  const data: Response = await fetchServerNotes('', 1, normalizedTag);

  return <Notes initialData={data} tag={tag} />;
}
