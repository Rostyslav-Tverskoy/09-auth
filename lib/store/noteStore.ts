import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type newDraft = {
  title: string;
  content: string;
  tag: string;
};

type noteStore = {
  draft: newDraft;
  setDraft: (note: newDraft) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<noteStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: (note: newDraft) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
