import Link from "next/link";
import css from "./SidebarNotes.module.css"


const NotesSidebar = () => {
    return (
        <div> <ul className={css.menuList}>
    <li className={css.menuItem} ><Link className={css.menuLink} href="/notes/filter/all">AllNotes</Link></li>
        <li><Link className={css.menuLink} href="/notes/filter/Todo">Todo</Link></li>
        <li><Link className={css.menuLink} href="/notes/filter/Work">Work</Link></li>
        <li><Link className={css.menuLink} href="/notes/filter/Personal">Personal</Link></li>
        <li><Link className={css.menuLink} href="/notes/filter/Meeting">Meeting</Link></li>
        <li><Link className={css.menuLink} href="/notes/filter/Shopping">Shopping</Link></li>
    </ul></div>
    )
}

export default NotesSidebar;