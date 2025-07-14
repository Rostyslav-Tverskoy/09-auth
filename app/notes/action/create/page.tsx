import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Form",
    description: "Create your Form",
    openGraph: {
        title: "Create Form",
        description: "Create Your Form",
        url: "https://07-routing-nextjs-gamma-two.vercel.app/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "CreateFormImage"

            }
        ]
    }
}


const CreateNote = () => {
return (
    <main className={css.main}>
  <div className={css.container}>
    <h1 className={css.title}>Create note</h1>
	   {<NoteForm />}
  </div>
</main>
)
}

export default CreateNote;