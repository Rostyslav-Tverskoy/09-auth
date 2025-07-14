import {create} from "zustand"
import {persist} from "zustand/middleware"

type initialDraft = {
  title: string;
  content: string,
  tag: string,
};

type NoteDraftStore = {
    draft: initialDraft;
    setDraft: (newNoteDraft: initialDraft) => void;
    clearDraft: () => void; 
}



export const useNoteDraft = create<NoteDraftStore>()(
    persist((set) => {
    return {
        draft: {
            title: "",
            content: "",
            tag: "Todo"
        },
        setDraft: (newNote:initialDraft) => {
            return set({draft: newNote})
        },
        clearDraft: () => {
            return set ({draft:{
                 title: "",
            content: "",
            tag: "Todo"
            } })
        }
    }
},{
    name: "draft",
    partialize: (store) => {
        return {draft:store.draft}
    }
})
)