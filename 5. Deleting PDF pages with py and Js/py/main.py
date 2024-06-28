import os
from pypdf import PdfReader, PdfWriter


def mm_to_px(mm):
    mm_in_inch = 25.4
    px_in_inch = 72

    inch = mm/mm_in_inch
    px = inch * px_in_inch

    return px


def delete_pdf_pages(input_pdf, pages_to_delete):
    try:
        with open(input_pdf, 'rb') as pdf_:
            pdf_reader = PdfReader(pdf_)
            pdf_writer = PdfWriter()

            pdf_pages = pdf_reader.get_num_pages()

            def page_exists(pg_to_exist):
                try:
                    getPage = pdf_reader.get_page(pg_to_exist)
                    return True
                except Exception as error:
                    return False

            def existing_pages(pages_to_exist):
                try:
                    if isinstance(pages_to_exist, list):
                        existing_pages_list = []
                        for pg_to_exist in pages_to_exist:
                            if page_exists(pg_to_exist):
                                existing_pages_list.append(pg_to_exist)
                        return existing_pages_list
                    else:
                        raise ValueError(
                            f'pages_to_exists should be of datatype {list}')

                except Exception as error:
                    print(error)

            added_pages = set()

            for pg_to_delete in pages_to_delete:
                if page_exists(pg_to_delete):
                    print(f'\npg#{pg_to_delete+1} exists in', input_pdf)
                    print('')
                    for pg in range(pdf_pages):
                        if pg not in pages_to_delete:
                            pdf_writer.add_page(pdf_reader.get_page(pg))
                            added_pages.add(pg)
                else:
                    print(f'page#{pg_to_delete+1} not exists')

                if existing_pages(pages_to_delete) and existing_pages(pages_to_delete).__len__() == pdf_pages:
                    A4_width_mm = 210
                    A4_height_mm = 297

                    pdf_writer.add_blank_page(width=mm_to_px(
                        A4_width_mm), height=mm_to_px(A4_height_mm))
                    added_pages.add(None)

            if len(added_pages) != 0:
                output_pdf = input(
                    'Enter updated pdf name: ') or 'updated-pdf'
                output_pdf = f'{output_pdf}.pdf'

                pdf_writer.write(output_pdf)
                pdf_writer.close()

                return output_pdf

    except Exception as error:
        print(error)


try:
    pdf_path = input(
        'Enter the PDF you want to delete pages from: ')
    pages_to_delete = input(
        'Enter the page numbers you want to delete (comma separated if more than 1): ')
    if len(pages_to_delete) == 1:
        pages_to_delete = [int(pg)-1 for pg in pages_to_delete]
    else:
        pages_to_delete = [int(pg)-1 for pg in pages_to_delete.split(',')]

    updated_pdf = delete_pdf_pages(pdf_path, pages_to_delete)
    # os.remove(updated_pdf)
except Exception as error:
    print(error)
