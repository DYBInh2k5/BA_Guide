import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const src='outputs/ba-rtm-sync-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx';
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(src));
console.log((await wb.inspect({kind:'workbook,sheet,table',maxChars:5000,tableMaxRows:20,tableMaxCols:12})).ndjson);
for (const name of ['Traceability','Overview']) {
 const blob=await wb.render({sheetName:name,autoCrop:'all',scale:1,format:'png'});
 await fs.writeFile(`outputs/ba-rtm-empty-state-update-20261121/source-${name}.png`,new Uint8Array(await blob.arrayBuffer()));
}
