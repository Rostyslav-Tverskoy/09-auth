"use client";
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import css from './NoteDetails.module.css';

type Props = {
  id: number
}



const  NoteDetailsClient = ({id} : Props) => {
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  
  

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.updatedAt ? `Updated at: ${note.updatedAt}` : `Created at: ${note.createdAt}`}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;