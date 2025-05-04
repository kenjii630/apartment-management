// src/hooks/useSearch.js
import { useState, useEffect, useMemo } from "react";

/**
 * useSearch
 * A hook to perform client-side or remote search with optional debouncing.
 *
 * @param {Array|Function} dataOrSearchFn
 *   • Array: will perform local search on specified fields.
 *   • Function: treated as searchFn(term) => Promise<items[]>.
 * @param {string[]|Function|null} fieldsOrFn
 *   • When dataOrSearchFn is Array: array of keys to search or custom filter fn.
 *   • Ignored when dataOrSearchFn is Function.
 * @param {string} initialTerm      Initial search term (default '').
 * @param {{ debounce?: number }} options  Optional config.
 *   • debounce: ms to debounce remote or local search calls.
 *
 * @returns {{
 *   term: string,
 *   setTerm: (v: string) => void,
 *   results: Array<any>,
 *   loading: boolean,
 *   error: any
 * }}
 */
export function useSearch(
  dataOrSearchFn,
  fieldsOrFn = null,
  initialTerm = "",
  options = {}
) {
  const { debounce: debounceMs } = options;
  const [term, setTerm] = useState(initialTerm);
  const [results, setResults] = useState(
    Array.isArray(dataOrSearchFn) ? dataOrSearchFn : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isRemote = typeof dataOrSearchFn === "function";

  // Local search memoization
  const localResults = useMemo(() => {
    if (!Array.isArray(dataOrSearchFn)) return [];
    const q = term.trim().toLowerCase();
    if (typeof fieldsOrFn === "function") {
      return fieldsOrFn(dataOrSearchFn, term);
    }
    if (!q) return dataOrSearchFn;
    return dataOrSearchFn.filter((item) =>
      fieldsOrFn.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [dataOrSearchFn, term, fieldsOrFn]);

  useEffect(() => {
    let active = true;
    if (isRemote) {
      setLoading(true);
      setError(null);
      const invoke = () => {
        dataOrSearchFn(term)
          .then((items) => {
            if (active) setResults(items);
          })
          .catch((err) => {
            if (active) setError(err);
          })
          .finally(() => {
            if (active) setLoading(false);
          });
      };
      if (debounceMs) {
        const id = setTimeout(invoke, debounceMs);
        return () => {
          active = false;
          clearTimeout(id);
        };
      } else {
        invoke();
        return () => {
          active = false;
        };
      }
    } else {
      // Local mode
      if (debounceMs) {
        setLoading(true);
        const id = setTimeout(() => {
          setResults(localResults);
          setLoading(false);
        }, debounceMs);
        return () => clearTimeout(id);
      } else {
        setResults(localResults);
      }
    }
  }, [term, dataOrSearchFn, localResults, debounceMs, isRemote]);

  return { term, setTerm, results, loading, error };
}
