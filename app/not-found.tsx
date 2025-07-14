import type { Metadata } from 'next';
import css from './NotFound.module.css';

export const metadata: Metadata = {
  title: 'NoteHub - Page not found',
  description:
    "The page you're looking for doesn't exist or has been moved. Try returning to the homepage or checking the URL.",
  openGraph: {
    type: 'website',
    url: 'https://08-zustand-one.vercel.app',
    title: 'NoteHub — Page Not Found',
    description:
      "The page you're looking for doesn't exist. But your notes are safe with NoteHub.",
    siteName: 'NoteHub',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
