import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create a New Note — NoteHub',
  description: 'Create a new note and organize your thoughts efficiently.',
  openGraph: {
    type: 'website',
    url: 'https://09-auth-sigma.vercel.app/notes/action/create',
    title: 'Create a New Note — NoteHub',
    description: 'Use this page to create and categorize a new note.',
    siteName: 'NoteHub',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
};

export default function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>
      <NoteForm />
    </div>
  );
}
