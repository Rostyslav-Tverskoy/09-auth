'use client';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { changeUser } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

export default function Edit() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationFn: changeUser,
  });

  function handleCancel() {
    router.back();
  }

  async function handleChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const values = {
        email: user.email as string,
        username: formData.get('username') as string,
      };

      const newUser = await mutateAsync(values);
      setUser(newUser);

      router.replace('/profile');
    } catch {
      toast.error('Something went wrong, please, try again');
    }
  }

  return (
    <div className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {user.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}
        <form className={css.profileInfo} onSubmit={handleChange}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user.username}</label>
            <input
              name="username"
              id="username"
              type="text"
              className={css.input}
              placeholder="New Username"
              defaultValue={user.username}
            />
          </div>
          <p>Email: {user.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
