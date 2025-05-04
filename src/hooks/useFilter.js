import { useState, useMemo, useEffect } from "react";

/**
 * useFilter hook for client-side filtering or remote fetching.
 *
 * @param {Array|Function} dataOrFetchFn
 *   • If Array: performs local filtering based on fieldsOrFn.
 *   • If Function: treated as fetchFunction(filter) => Promise<itemsArray>.
 * @param {string[]|Function|null} fieldsOrFn
 *   • In local mode: array of keys or custom function.
 *   • In fetch mode: ignored (pass null).
 * @param {string} initialFilter initial filter string or param
 * @param {{ debounce?: number }} options
 *   • debounce: ms to debounce fetch calls (default no debounce).
 *
 * @returns {{
 *   filter: any,
 *   setFilter: (v: any) => void,
 *   filteredData: Array<any>,
 *   loading: boolean,
 *   error: any
 * }}
 */
export function useFilter(
  dataOrFetchFn,
  fieldsOrFn = null,
  initialFilter = "",
  options = {}
) {
  const { debounce: debounceMs } = options;
  const [filter, setFilter] = useState(initialFilter);
  const [filteredData, setFilteredData] = useState(
    Array.isArray(dataOrFetchFn) ? dataOrFetchFn : []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFetchMode = typeof dataOrFetchFn === "function";

  // Compute local filtering result when in local mode
  const localFiltered = useMemo(() => {
    if (!Array.isArray(dataOrFetchFn)) return [];
    const q = String(filter).toLowerCase();
    if (typeof fieldsOrFn === "function") {
      return fieldsOrFn(dataOrFetchFn, filter);
    }
    if (!q) return dataOrFetchFn;
    return dataOrFetchFn.filter((item) =>
      fieldsOrFn.some((key) =>
        String(item[key] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [dataOrFetchFn, filter, fieldsOrFn]);

  useEffect(() => {
    if (isFetchMode) {
      let active = true;
      setLoading(true);
      setError(null);

      const fetchData = () => {
        dataOrFetchFn(filter)
          .then((items) => {
            if (active) setFilteredData(items);
          })
          .catch((err) => {
            if (active) setError(err);
          })
          .finally(() => {
            if (active) setLoading(false);
          });
      };

      if (debounceMs) {
        const timer = setTimeout(fetchData, debounceMs);
        return () => {
          active = false;
          clearTimeout(timer);
        };
      } else {
        fetchData();
        return () => {
          active = false;
        };
      }
    } else {
      setFilteredData(localFiltered);
    }
  }, [filter, dataOrFetchFn, localFiltered, debounceMs, isFetchMode]);

  return { filter, setFilter, filteredData, loading, error };
}
