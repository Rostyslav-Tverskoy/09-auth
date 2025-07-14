'use client';
import { tags } from '@/types/tags';
import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useState } from 'react';

export default function TagsMenu() {
  const [isTagListOpened, setIsTagListOpened] = useState(false);

  function handleOpener() {
    setIsTagListOpened(prev => !prev);
  }

  function handleCloseMenu() {
    setIsTagListOpened(false);
  }

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleOpener}>
        Notes ▾
      </button>
      {isTagListOpened && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href={`/notes/filter/All`}
              className={css.menuLink}
              onClick={handleCloseMenu}
            >
              All
            </Link>
          </li>
          {tags.map(tagItem => (
            <li className={css.menuItem} key={tagItem}>
              <Link
                href={`/notes/filter/${tagItem}`}
                className={css.menuLink}
                onClick={handleCloseMenu}
              >
                {tagItem}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
