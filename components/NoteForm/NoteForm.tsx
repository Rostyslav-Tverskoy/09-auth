"use client"


import { createNote } from '@/lib/api';
import styles from './NoteForm.module.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { type Note } from "../../types/note";
import { useNoteDraft } from '@/lib/store/noteStore';
import { ChangeEvent } from 'react';


const NoteForm = () => {
const {draft, setDraft, clearDraft} = useNoteDraft();


   const route = useRouter()
  const {mutate} = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
    clearDraft()
    route.push("/notes/filter/all")
    }
  })





  const handleSubmit = (formData: FormData) => {
   const newNote = Object.fromEntries(formData) as unknown as Note;
   
   mutate(newNote);
     
    
  }

  const handleCancel = () => {
route.push("/notes/filter/all")
  }

  const handleChange = ({target: {value, name} } : ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
   setDraft({...draft, [name]: value})
  }


  return ( 
        <form className={styles.form} action={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.input}
              autoComplete="off"
              onChange={handleChange}
              defaultValue={draft.title}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className={styles.textarea}
              onChange={handleChange}
              defaultValue={draft.content}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="tag">Tag</label>
            <select id="tag" name="tag" className={styles.select} onChange={handleChange} defaultValue={draft.tag}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitButton}
            >
              Create note
            </button>
             <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
 

export default NoteForm;