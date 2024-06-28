import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';

const pdfDoc = await PDFDocument.create();

const cdlist = await fs.readdir('.');
for (const file of cdlist) {
    if (file.endsWith('.pdf')) {
        const PdfBytes = await fs.readFile(file);
        const srcDoc = await PDFDocument.load(PdfBytes);
        const pgIndices = srcDoc.getPageIndices();
        const copiedPages = await pdfDoc.copyPages(srcDoc, pgIndices);
        copiedPages.forEach(page => {
            pdfDoc.addPage(page);
        });
    }
}

const mergedPdfBytes = await pdfDoc.save();
await fs.writeFile('merged.pdf', mergedPdfBytes);