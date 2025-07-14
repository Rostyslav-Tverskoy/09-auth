'use client';
import { useState } from 'react';
import css from './SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { signIn } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignIn() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
  });

  const setUser = useAuthStore(state => state.setUser);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      if (error) {
        setError('');
      }
      const values = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const response = await mutateAsync(values);
      setUser(response);

      router.replace('/profile');
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      const message =
        error.response?.data?.error || 'Invalid email or password';
      setError(message);
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.formTitle}>Sign in</h1>

      <div className={css.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          className={css.input}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className={css.input}
          required
        />
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Log in
        </button>
      </div>

      <p className={css.error}>{error}</p>
    </form>
  );
}
