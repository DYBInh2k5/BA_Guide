import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const src='outputs/ba-rtm-sync-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx';
const outDir='outputs/ba-rtm-empty-state-update-20261121';
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(src));
const sheet=wb.worksheets.getItem('Traceability');
const table=sheet.tables.items[0];
table.rows.add(null, [[
 'AC-US02-04','Acceptance Criteria','Authorized staff see the approved empty state when no reservation matches the queue scope/filter (draft; exact UX TBD)','US-02 / UC-02','Staff queue Figma; backlog AC-US02-04; UAT walkthrough','UAT-11','Linked','Scenario documented only; not executed; UX copy/action TBD','Draft','Product + Operations + Design','Confirm whether truly empty queue and filter-no-match are separate states; approve copy/action; execute with synthetic test data'
]]);
sheet.getRange('A17:K17').copyFrom(sheet.getRange('A16:K16'),'all');
sheet.getRange('A17:K17').values=[[
 'AC-US02-04','Acceptance Criteria','Authorized staff see the approved empty state when no reservation matches the queue scope/filter (draft; exact UX TBD)','US-02 / UC-02','Staff queue Figma; backlog AC-US02-04; UAT walkthrough','UAT-11','Linked','Scenario documented only; not executed; UX copy/action TBD','Draft','Product + Operations + Design','Confirm whether truly empty queue and filter-no-match are separate states; approve copy/action; execute with synthetic test data'
]];
sheet.getRange('A17:K17').format.wrapText=true;
sheet.getRange('17:17').format.rowHeight=72;
const overview=wb.worksheets.getItem('Overview');
overview.getRange('B5').formulas=[['=COUNTA(Traceability!$A$2:$A$17)']];
overview.getRange('B6').formulas=[['=COUNTIF(Traceability!$I$2:$I$17,"Verified")']];
overview.getRange('B7').formulas=[['=COUNTIF(Traceability!$G$2:$G$17,"Gap")']];
overview.getRange('B8').formulas=[['=COUNTIF(Traceability!$G$2:$G$17,"Partial")']];
overview.getRange('B9').formulas=[['=COUNTIF(Traceability!$I$2:$I$17,"Deferred")']];
await wb.recalculate();
console.log((await wb.inspect({kind:'region',sheetId:'Traceability',range:'A15:K17',maxChars:2200})).ndjson);
console.log((await wb.inspect({kind:'region',sheetId:'Overview',range:'A4:D9',maxChars:1200})).ndjson);
for (const name of ['Traceability','Overview']) {
 const blob=await wb.render({sheetName:name,autoCrop:'all',scale:1,format:'png'});
 await fs.writeFile(`${outDir}/final-${name}.png`,new Uint8Array(await blob.arrayBuffer()));
}
const xlsx=await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(`${outDir}/Requirements-Traceability-and-Impact-Analysis.xlsx`);

