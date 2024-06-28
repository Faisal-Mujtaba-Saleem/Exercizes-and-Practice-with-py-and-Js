import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline/promises';

const pdfDoc = await PDFDocument.create();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

`
def mm_to_px(mm):
    mm_in_inch = 25.4
    px_in_inch = 72

    inch = mm/mm_in_inch
    px = inch * px_in_inch

    return px
`

function A4_size() {
    const A4_width_mm = 210;
    const A4_height_mm = 297;

    const mm_in_inch = 25.4;
    const px_in_inch = 72;

    const A4_width_inches = A4_width_mm / mm_in_inch;
    const A4_width_px = A4_width_inches * px_in_inch;

    const A4_height_inches = A4_height_mm / mm_in_inch;
    const A4_height_px = A4_height_inches * px_in_inch;

    return {
        A4_width: A4_width_px,
        A4_height: A4_height_px
    }
}

async function deletePdfPages(pdfPath, pagesToDelete = []) {
    try {
        const inputPdfBytes = await fs.readFile(pdfPath);
        const inputPdf = await PDFDocument.load(inputPdfBytes);

        const inputPdfPages = inputPdf.getPageIndices();
        let pagesToAdd = [];

        for (const pgToDelete of pagesToDelete) {
            if (inputPdfPages.includes(pgToDelete)) {
                pagesToAdd = inputPdfPages.filter((pgToAdd) => {
                    return pgToAdd !== pgToDelete;
                })
            } else {
                console.log(`pg#${pgToDelete} not exists!`);
            }
        }

        const pagesToDelete_equalsTo_inputPdfPages = new Set([...pagesToDelete,]).size === inputPdfPages.length;
        if (pagesToDelete_equalsTo_inputPdfPages) {
            pdfDoc.addPage([A4_size().A4_width, A4_size().A4_height])
        } else {
            pagesToAdd = await pdfDoc.copyPages(inputPdf, pagesToAdd);
            pagesToAdd.forEach(pgToAdd => {
                pdfDoc.addPage(pgToAdd);
            });
        }

        let updatedPdfPath = await rl.question(`Enter updated pdf name: `) || 'updated-pdf';
        updatedPdfPath = `${updatedPdfPath}.pdf`;
        updatedPdfPath = path.join(path.dirname(pdfPath), updatedPdfPath);

        const updatedPdfBytes = await pdfDoc.save();

        const updatedPdf = await fs.writeFile(updatedPdfPath, updatedPdfBytes);

        return updatedPdf;

    } catch (error) {
        console.log(error);
    }
}

try {
    const pdfPath = await rl.question(`Enter the PDF you want to delete pages from: `);
    let pagesToDelete = await rl.question('Enter the page numbers you want to delete (comma separated if more than 1): ');
    if (pagesToDelete.length === 1)
        pagesToDelete = [parseInt(pagesToDelete) - 1];
    else {
        pagesToDelete = pagesToDelete.split(',');
        pagesToDelete = pagesToDelete.map((pg) => {
            return parseInt(pg) - 1;
        })
    }

    const updated_pdf = await deletePdfPages(pdfPath, pagesToDelete);
} catch (error) {
    console.log(error);
}