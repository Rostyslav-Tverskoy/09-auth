'use client';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';

import { User } from '@/types/user';


type Props = {
  user: User
}

export default function ProfileClient({ user }: Props) {
  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        {user.avatar && (
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
        )}
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
}