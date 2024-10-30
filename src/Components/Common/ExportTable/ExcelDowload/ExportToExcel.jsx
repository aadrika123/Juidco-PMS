import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ data }) => {

  const exportToExcel = () => {
    // Step 1: Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Step 2: Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Step 3: Generate a binary Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Step 4: Create a blob from the binary data
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Step 5: Save the blob to file using file-saver
    saveAs(blob, "data.xlsx");
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="text-white px-5 py-1.5 rounded bg-[#227447] text-sm hover:bg-[#14452a]"
      >
        Excel
      </button>
    </div>
  );
};

export default ExportToExcel;
