import os
from pypdf import PdfReader, PdfWriter

merger = PdfWriter()

pdfDir = '.'
pdflist = os.listdir(pdfDir)
for file in pdflist:
    if file.endswith('.pdf'):
        print(file)
        merger.append(file)

merger.write('merged_pdf.pdf')
merger.close()


# pdfDir = '.'
# pdflist = os.listdir(pdfDir)
# for i, file in enumerate(pdflist):
#     filepath = os.path.join(pdfDir, file)
#     print(filepath)
#     input = open(filepath, 'rb')
#     merger.append(file) if i == 0 else merger.append(position=1, fileobj=input)

# with open('merged-doc.pdf', 'wb') as mergedfile:
#     merger.write('merged_pdf.pdf')
#     merger.close()
