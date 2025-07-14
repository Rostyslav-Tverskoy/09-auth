"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import styles from "./NotePreview.module.css";
import { useRouter } from "next/navigation";

type Props = {
  id: number
};

const NotePreviewClient = ({ id }: Props) => {
  const router = useRouter();
  const idk = Number(id);
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", idk],
    queryFn: () => fetchNoteById(idk),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  }

  if (isLoading) return <Modal onClose={handleClose}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={handleClose}>Error loading note</Modal>;

  return (
    <Modal onClose={handleClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          <span className={styles.tag}>{note.tag}</span>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>
          {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;