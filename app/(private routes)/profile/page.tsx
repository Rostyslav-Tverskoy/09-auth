import { Metadata } from 'next';
import { getServerUser } from '@/lib/api/serverApi';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'Your Profile — NoteHub',
  description:
    'Manage your personal information, view your saved notes, and customize your experience in your NoteHub profile.',
  openGraph: {
    type: 'profile',
    url: 'https://09-auth-sigma.vercel.app/profile',
    title: 'Your Profile — NoteHub',
    description:
      'Access your profile, manage your notes, and personalize your NoteHub account for a better note-taking experience.',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getServerUser();
  return <ProfileClient user={user} />;
}
