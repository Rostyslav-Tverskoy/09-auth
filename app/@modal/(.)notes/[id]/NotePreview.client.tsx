'use client';
import css from './NotePreview.module.css';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';
import { useState } from 'react';

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const [isModalOpened, setIsModalOpened] = useState(true);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const route = useRouter();
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  function toggleModal() {
    setIsModalOpened(!isModalOpened);
    route.back();
  }

  return (
    <>
      {isModalOpened && (
        <Modal onClose={toggleModal}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note.title}</h2>
                <span className={css.tag}>{note.tag}</span>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.date}>{note.createdAt}</p>
              <button
                type="button"
                className={css.backBtn}
                onClick={toggleModal}
              >
                Go Back
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
