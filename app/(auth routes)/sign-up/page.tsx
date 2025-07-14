'use client';
import { useMutation } from '@tanstack/react-query';
import css from './SignUpPage.module.css';
import { register } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUp() {
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { mutateAsync } = useMutation({
    mutationFn: register,
  });

  const setUser = useAuthStore(state => state.setUser);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      if (isError) {
        setIsError(false);
      }
      const values = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const response = await mutateAsync(values);
      setUser(response);

      router.replace('/profile');
    } catch {
      setIsError(true);
    }
  }

  return (
    <>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
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
            minLength={8}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>
        {isError && <p className={css.error}>Error</p>}
      </form>
    </>
  );
}
