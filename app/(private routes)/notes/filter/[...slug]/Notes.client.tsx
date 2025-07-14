'use client';
import css from './NotesPage.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import type { Response } from '@/types/response';
import Link from 'next/link';

type NotesProps = {
  initialData: Response;
  tag: string;
};

export default function Notes({ initialData, tag }: NotesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const normalizedTag = tag === 'All' ? undefined : tag;

  const { data } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage, normalizedTag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, normalizedTag),
    placeholderData: keepPreviousData,
    initialData:
      debouncedQuery === '' && currentPage === 1
        ? () => initialData
        : undefined,
  });

  function handlePageChange(currentPage: number): void {
    setCurrentPage(currentPage);
  }

  function handleSearchChange(query: string): void {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearchChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {data && data.notes.length !== 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
