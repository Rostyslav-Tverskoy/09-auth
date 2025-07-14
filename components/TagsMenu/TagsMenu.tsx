"use client";

import { useState } from "react";
import css from "./TagsMenu.module.css";
import Link from "next/link";

const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev); 
  const closeMenu = () => setIsOpen(false);            

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link className={css.menuLink} href="/notes/filter/all" onClick={closeMenu}>
              AllNotes
            </Link>
          </li>

          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                className={css.menuLink}
                href={`/notes/filter/${tag}`}
                onClick={closeMenu}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;