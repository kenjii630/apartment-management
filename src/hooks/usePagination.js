// src/hooks/usePagination.js
import { useState } from "react";

export function usePagination(initialPage, initialPerPage) {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return { page, perPage, nextPage, prevPage, setPage, setPerPage };
}
