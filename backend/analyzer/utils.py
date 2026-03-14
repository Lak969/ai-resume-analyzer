import pdfplumber

def extract_text_from_pdf(file_path):
    text=""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:  # ensure it is not None
                text += page_text + "\n"

    print("Extracted text length:", len(text))
    return text

