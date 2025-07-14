"use client";
import css from "../../app/@modal/(.)notes/[id]/NotePreview.module.css"
import { useRouter } from "next/navigation";



type Props = {
    children: React.ReactNode;
}

const Modal = ({children}: Props) => {
     const router = useRouter();
     const close = () => router.back();



     return (
        <div>
            <div>
                {children}
                <button className={css.backBtn} onClick={close}>Close</button>
            </div>
        </div>
     )



}

export default Modal;