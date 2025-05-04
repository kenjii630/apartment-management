import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

/**
 * Export tabular data to an .xlsx file with ExcelJS
 * @param {object[]} rows - array of data objects
 * @param {Array<{ header: string, accessor: string|function }>} cols
 * @param {string} fileName
 */
export async function exportToExcel(rows, cols, fileName = "export.xlsx") {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Sheet1");

  // Header row with styling
  ws.addRow(cols.map((c) => c.header));
  ws.getRow(1).font = { bold: true, size: 12 };
  ws.getRow(1).alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFCCE5FF" },
    };
    cell.border = {
      bottom: { style: "thin" },
    };
  });

  // Data rows
  rows.forEach((row) => {
    const values = cols.map((col) =>
      typeof col.accessor === "function" ? col.accessor(row) : row[col.accessor]
    );
    ws.addRow(values);
  });

  // Auto-width columns
  ws.columns.forEach((column) => {
    let maxLength = 12;
    column.eachCell({ includeEmpty: true }, (cell) => {
      const len = cell.value?.toString().length || 0;
      if (len > maxLength) maxLength = len;
    });
    column.width = maxLength + 2;
  });

  // Freeze header
  ws.views = [{ state: "frozen", ySplit: 1 }];

  // Generate and download
  const buf = await wb.xlsx.writeBuffer();
  saveAs(new Blob([buf]), fileName);
}
