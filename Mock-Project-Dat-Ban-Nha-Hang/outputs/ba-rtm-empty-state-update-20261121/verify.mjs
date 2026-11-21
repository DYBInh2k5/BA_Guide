import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const file='outputs/ba-rtm-empty-state-update-20261121/Requirements-Traceability-and-Impact-Analysis.xlsx';
const wb=await SpreadsheetFile.importXlsx(await FileBlob.load(file));
console.log((await wb.inspect({kind:'region',sheetId:'Traceability',range:'A17:K17',maxChars:1800})).ndjson);
console.log((await wb.inspect({kind:'region',sheetId:'Overview',range:'A5:B9',maxChars:1000})).ndjson);
const img=await wb.render({sheetName:'Traceability',range:'A17:K17',scale:1,format:'png'});
const fs=await import('node:fs/promises'); await fs.writeFile('outputs/ba-rtm-empty-state-update-20261121/check-row17.png',new Uint8Array(await img.arrayBuffer()));
