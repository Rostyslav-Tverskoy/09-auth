"use client";

import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../../../components/NoteList/NoteList";
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import styles from "../../App.module.css";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../../../lib/api";
import type { Note } from "../../../../types/note";
import Link from "next/link";

interface NotesClientProps {
  initialNotes: Note[];
  initialPage: number;
  initialSearch: string;
  totalPages: number;
  tag: string;
}

const NotesClient: React.FC<NotesClientProps> = ({
  initialNotes,
  initialPage,
  initialSearch,
  totalPages,
  tag,
}) => {
  const [page, setPage] = useState<number>(initialPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, tag }),
    placeholderData: keepPreviousData,
    initialData: {
      notes: initialNotes,
      totalPages,
    },
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data.totalPages > 1 && (
          <Pagination
            page={page}
            pageCount={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <Link href="/notes/action/create">Create Note +</Link>
      </header>

      {data.notes.length > 0 ? 
        <NoteList  notes={data.notes}/> : <p>No notes found</p>
      }

    </div>
  );
};

export default NotesClient;