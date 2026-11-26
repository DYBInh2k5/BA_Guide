import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(outDir, "../..");
const sourcePath = path.join(root, "Status-Inquiry-Coding-Practice.csv");
const csv = await fs.readFile(sourcePath, "utf8");
const workbook = await Workbook.fromCSV(csv, { sheetName: "Coding practice" });
const coding = workbook.worksheets.getItem("Coding practice");
const dashboard = workbook.worksheets.add("Summary");
const font = "Arial";

coding.showGridLines = false;
dashboard.showGridLines = false;

coding.getRange("M1").values = [["Coding status"]];
coding.getRange("M2").formulas = [['=IF(I2="","Pending coding",IF(I2="Unknown","Unknown reason","Coded"))']];
coding.getRange("M2:M13").fillDown();
coding.getRange("I2:I13").dataValidation = {
  rule: { type: "list", values: ["H1", "H2", "H3", "Unknown"] },
};
coding.getRange("J2:J13").dataValidation = {
  rule: { type: "list", values: ["High", "Medium", "Low"] },
};
coding.getRange("A1:M13").format.font = { name: font, size: 10, color: "#263238" };
coding.getRange("A1:M1").format = {
  fill: "#1F4E78",
  font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  wrapText: true,
  verticalAlignment: "center",
  horizontalAlignment: "center",
};
coding.getRange("A1:M1").format.rowHeight = 36;
coding.getRange("I2:K13").format.fill = "#FFF2CC";
coding.getRange("M2:M13").format.fill = "#EAF0F6";
coding.getRange("A2:C13").format.horizontalAlignment = "left";
coding.getRange("D2:M13").format.horizontalAlignment = "left";
coding.getRange("A1:M13").format.verticalAlignment = "center";
coding.getRange("A1:M13").format.wrapText = false;
coding.getRange("F:F").format.columnWidth = 52;
coding.getRange("A:A").format.columnWidth = 16;
coding.getRange("B:B").format.columnWidth = 22;
coding.getRange("C:C").format.columnWidth = 14;
coding.getRange("D:E").format.columnWidth = 22;
coding.getRange("G:G").format.columnWidth = 18;
coding.getRange("H:J").format.columnWidth = 18;
coding.getRange("K:K").format.columnWidth = 38;
coding.getRange("L:L").format.columnWidth = 24;
coding.getRange("M:M").format.columnWidth = 20;
coding.freezePanes.freezeRows(1);
coding.tables.add("A1:M13", true, "InquiryCodingTable");

dashboard.getRange("A1").values = [["Status inquiry coding practice"]];
dashboard.getRange("A1:H1").merge();
dashboard.getRange("A3:B3").values = [["Measure", "Result"]];
dashboard.getRange("A4:A9").values = [
  ["Cases in fixture"],
  ["Cases linked to request"],
  ["Linkage coverage"],
  ["Cases coded"],
  ["Pending coding"],
  ["Coded as Unknown"],
];
dashboard.getRange("B4:B9").formulas = [
  ["=COUNTA('Coding practice'!$A$2:$A$13)"],
  ['=COUNTIF(\'Coding practice\'!$G$2:$G$13,"Yes")'],
  ["=IFERROR(B5/B4,0)"],
  ['=COUNTIF(\'Coding practice\'!$M$2:$M$13,"Coded")+COUNTIF(\'Coding practice\'!$M$2:$M$13,"Unknown reason")'],
  ['=COUNTIF(\'Coding practice\'!$M$2:$M$13,"Pending coding")'],
  ['=COUNTIF(\'Coding practice\'!$M$2:$M$13,"Unknown reason")'],
];
dashboard.getRange("D3:F3").values = [["Category", "WEB", "PHONE"]];
dashboard.getRange("D4:D7").values = [["H1"], ["H2"], ["H3"], ["Unknown"]];
dashboard.getRange("E4").formulas = [['=COUNTIFS(\'Coding practice\'!$I$2:$I$13,$D4,\'Coding practice\'!$D$2:$D$13,E$3)']];
dashboard.getRange("E4:F4").fillRight();
dashboard.getRange("E4:F7").fillDown();
dashboard.getRange("G3:H3").values = [["Category", "All channels"]];
dashboard.getRange("G4:G7").values = [["H1"], ["H2"], ["H3"], ["Unknown"]];
dashboard.getRange("H4").formulas = [['=COUNTIF(\'Coding practice\'!$I$2:$I$13,G4)']];
dashboard.getRange("H4:H7").fillDown();
dashboard.getRange("A12").values = [["How to use"]];
dashboard.getRange("A12:H12").merge();
dashboard.getRange("A13").values = [["1. Classify each synthetic call in the yellow cells on Coding practice. Leave unresolved cases blank until you decide to code Unknown."]];
dashboard.getRange("A13:H13").merge();
dashboard.getRange("A14").values = [["2. Use the category-by-channel count table like a PivotTable. Counts and coverage update from your classifications. This is a formula summary, not a native PivotTable."]];
dashboard.getRange("A14:H14").merge();
dashboard.getRange("A16").values = [["Scope"]];
dashboard.getRange("A16:H16").merge();
dashboard.getRange("A17").values = [["All 12 records are fictional role-play examples. Linkage coverage describes this fixture only. It is not customer research or a real business KPI."]];
dashboard.getRange("A17:H17").merge();
dashboard.getRange("A1:H1").format = {
  font: { name: font, size: 15, bold: true, color: "#17365D" },
  verticalAlignment: "center",
};
dashboard.getRange("A1:H1").format.rowHeight = 26;
dashboard.getRange("A3:B3").format = {
  fill: "#1F4E78",
  font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
dashboard.getRange("D3:F3").format = {
  fill: "#1F4E78",
  font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
dashboard.getRange("G3:H3").format = {
  fill: "#1F4E78",
  font: { name: font, size: 10, bold: true, color: "#FFFFFF" },
  horizontalAlignment: "center",
};
dashboard.getRange("A4:B9").format.font = { name: font, size: 10, color: "#263238" };
dashboard.getRange("B4:B9").format.fill = "#EAF0F6";
dashboard.getRange("B6").format.numberFormat = "0.0%";
dashboard.getRange("D4:H7").format.font = { name: font, size: 10, color: "#263238" };
dashboard.getRange("A12:H12").format = {
  fill: "#D9EAF7",
  font: { name: font, size: 10, bold: true, color: "#17365D" },
};
dashboard.getRange("A13:H14").format = { font: { name: font, size: 10, color: "#263238" }, wrapText: true };
dashboard.getRange("A16:H16").format = {
  fill: "#D9EAF7",
  font: { name: font, size: 10, bold: true, color: "#17365D" },
};
dashboard.getRange("A17:H17").format = { font: { name: font, size: 10, italic: true, color: "#5B6573" }, wrapText: true };
dashboard.getRange("A:A").format.columnWidth = 30;
dashboard.getRange("B:B").format.columnWidth = 18;
dashboard.getRange("C:C").format.columnWidth = 3;
dashboard.getRange("D:D").format.columnWidth = 18;
dashboard.getRange("E:F").format.columnWidth = 14;
dashboard.getRange("G:G").format.columnWidth = 18;
dashboard.getRange("H:H").format.columnWidth = 18;
dashboard.getRange("A1:H17").format.verticalAlignment = "center";
dashboard.getRange("A13:H14").format.rowHeight = 32;
dashboard.getRange("A17:H17").format.rowHeight = 32;
dashboard.freezePanes.freezeRows(3);

coding.getRange("I2:I4").values = [["H1"], ["H2"], ["Unknown"]];
workbook.recalculate();
const dynamicCheck = await workbook.inspect({
  kind: "region",
  range: "Summary!A7:B9",
  include: "values,formulas",
  maxChars: 1000,
});
console.log(dynamicCheck.ndjson);
coding.getRange("I2:I4").clear({ applyTo: "contents" });
workbook.recalculate();

const summaryInspect = await workbook.inspect({
  kind: "table",
  range: "Summary!A1:H17",
  include: "values,formulas",
  tableMaxRows: 18,
  tableMaxCols: 8,
  maxChars: 5000,
});
console.log(summaryInspect.ndjson);
const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errorScan.ndjson);
const preview = await workbook.render({ sheetName: "Summary", range: "A1:H17", scale: 1, format: "png" });
await fs.writeFile(path.join(outDir, "summary-preview.png"), new Uint8Array(await preview.arrayBuffer()));
const codingPreview = await workbook.render({ sheetName: "Coding practice", range: "A1:M13", scale: 0.8, format: "png" });
await fs.writeFile(path.join(outDir, "coding-preview.png"), new Uint8Array(await codingPreview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
const outputPath = path.join(outDir, "Status-Inquiry-Coding-Practice.xlsx");
await xlsx.save(outputPath);
const savedWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const savedCheck = await savedWorkbook.inspect({
  kind: "region",
  range: "Summary!A4:B9",
  include: "values,formulas",
  maxChars: 1500,
});
console.log(savedCheck.ndjson);
