// src/components/DataTable.jsx
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";
import { usePagination } from "@/hooks/usePagination";
import { exportToExcel } from "@/utils/excelExport";
import { useTranslation } from "react-i18next";

/** Helper to resolve accessor values (string path or function) */
function getValue(row, accessor) {
  if (typeof accessor === "function") return accessor(row);
  return accessor.split(".").reduce((obj, key) => obj?.[key], row);
}

/**
 * DataTable component: server-driven pagination, create/update/delete actions.
 */
export default function DataTable({
  title,
  moduleTitle,
  columns,
  fetchService,
  pageSizeOptions = [10, 15, 20],
  onCreate,
  onUpdate,
  onDelete,
}) {
  // Pagination state
  // Pagination state — start with the first option in the dropdown
  const { page, perPage, prevPage, nextPage, setPerPage, setPage } =
    usePagination(1, pageSizeOptions[0]);

  // Data state
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
  const [header, setHeader] = useState([]);
  const { t } = useTranslation();

  // Fetch data on page or perPage change
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchService(page, perPage)
      .then(({ data, total }) => {
        if (!active) return;
        setRows(Array.isArray(data) ? data : []);
        setTotalCount(total);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load data");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [page, perPage, fetchService]);
  // Derive columns if not provided
  const cols = useMemo(() => {
    if (columns && columns.length) return columns;
    const first = rows[0] || {};
    setHeader(Object.keys(first));
    return Object.keys(first).map((key) => ({ header: key, accessor: key }));
  }, [columns, rows]);

  // Handle rows-per-page change
  const handlePerPageChange = (e) => {
    const n = Number(e.target.value);
    setPerPage(n);
    setPage(1);
  };

  // Render loading or error states
  // if (loading) return <p>Loading...</p>;
  if (loading) {
    // Build a skeleton with the same number of columns and rows as your page size
    const colCount = columns?.length ?? 3;
    const skeletonRows = Array.from({ length: perPage });

    return (
      <div>
        <div className="bg-background text-text p-6 rounded-lg shadow">
          <div className="animate-pulse">
            {/* Header bar placeholder */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
              <h2 className="text-xl font-semibold">{t(title)}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* <select
                    value={perPage}
                    onChange={handlePerPageChange}
                    className="px-2 py-1 border border-gray-300 rounded bg-background text-text focus:outline-none"
                  >
                    {pageSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} / page
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={prevPage}
                    disabled={page === 1}
                    className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ArrowLeftIcon
                      className="h-5 w-5 inline"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ArrowRightIcon
                      className="h-5 w-5 inline"
                      aria-hidden="true"
                    />
                  </button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span> */}
                  <span className="font-semibold text-gray-400">
                    Totals: {totalCount}
                  </span>
                </div>
              </div>
            </div>
            {/* Table skeleton */}
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {cols.map((col) => (
                      <th
                        key={col.accessor.toString()}
                        className="
                sticky top-0 z-10
                px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                bg-gray-50 dark:bg-gray-800
                text-gray-700 dark:text-gray-300
              "
                      >
                        {t(col.header)}
                      </th>
                    ))}
                    {/* <th
                      className="
              sticky top-0 z-10
              px-6 py-3 text-right text-xs font-medium uppercase tracking-wider
              bg-gray-50 dark:bg-gray-800
              text-gray-700 dark:text-gray-300
            "
                    >
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {skeletonRows.map((_, rowIdx) => (
                    <tr key={rowIdx}>
                      {[...Array(colCount)].map((_, colIdx) => (
                        <td key={colIdx} className="px-6 py-4">
                          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                        </td>
                      ))}
                      {/* <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full" />
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Header bar for action */}
      {/* <div className="flex justify-between items-center mb-4 bg-cyan-200 rounded-md p-4 ">
        <h1 className="text-3xl font-bold">
          {moduleTitle ? moduleTitle : title}
        </h1>
        <button
          onClick={onCreate}
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-primary focus:outline-none"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create
        </button>

        <button
          type="button"
          onClick={() => exportToExcel(rows, cols)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Export
        </button>
      </div> */}
      <div className="bg-background text-text p-6 rounded-lg shadow">
        {/* Header: title, create, per-page, pagination */}
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold">{title}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <select
                value={perPage}
                onChange={handlePerPageChange}
                className="px-2 py-1 border border-gray-300 rounded bg-background text-text focus:outline-none"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt} / page
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={prevPage}
                disabled={page === 1}
                className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ArrowLeftIcon className="h-5 w-5 inline" aria-hidden="true" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <ArrowRightIcon className="h-5 w-5 inline" aria-hidden="true" />
              </button>
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>

              <span className="font-semibold text-gray-400">
                Totals: {totalCount}
              </span>
            </div>
          </div>
        </div> */}
        {/* Table */}
        <div className="overflow-x-auto rounded-md">
          <div className="max-h-160 overflow-y-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
              <h2 className="text-xl font-semibold">{t(title)}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {/* <select
                    value={perPage}
                    onChange={handlePerPageChange}
                    className="px-2 py-1 border border-gray-300 rounded bg-background text-text focus:outline-none"
                  >
                    {pageSizeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt} / page
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={prevPage}
                    disabled={page === 1}
                    className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ArrowLeftIcon
                      className="h-5 w-5 inline"
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className="p-1 bg-card rounded disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <ArrowRightIcon
                      className="h-5 w-5 inline"
                      aria-hidden="true"
                    />
                  </button>
                  <span className="text-sm">
                    Page {page} of {totalPages}
                  </span> */}

                  <span className="font-semibold text-gray-400">
                    Totals: {totalCount}
                  </span>
                </div>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200 text-primary">
              <thead className="bg-card">
                <tr>
                  {cols.map((col, inx) => (
                    <th
                      key={col.accessor.toString()}
                      className={`sticky top-0 z-10
                px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-primary ${
                  inx === 0 ? "rounded-tl-md" : ""
                } ${inx === cols.length - 1 ? "rounded-tr-md" : ""}`}
                    >
                      {t(col.header)}
                    </th>
                  ))}
                  {/* <th
                    className="
              sticky top-0 z-10
              px-6 py-3 text-right text-xs font-medium uppercase tracking-wider
              bg-gray-50 dark:bg-gray-800
              text-gray-700 dark:text-gray-300
            "
                  >
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-gray-200">
                {rows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    {cols.map((col) => (
                      <td
                        key={col.accessor.toString()}
                        className="px-6 py-4 whitespace-nowrap text-sm"
                      >
                        {getValue(row, col.accessor)}
                      </td>
                    ))}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => onUpdate(row)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon
                          className="h-5 w-5 inline"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        onClick={() => onDelete(row)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon
                          className="h-5 w-5 inline"
                          aria-hidden="true"
                        />
                      </button>
                    </td> */}
                  </tr>
                ))}
                {totalCount === 0 && (
                  <tr>
                    <td
                      colSpan={cols.length + 1}
                      className="px-6 py-4 text-center"
                    >
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  moduleTitle: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
    })
  ),
  fetchService: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onCreate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
