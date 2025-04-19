import PyPDF2
import os

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num in range(len(reader.pages)):
                text += reader.pages[page_num].extract_text() + "\n"
            return text
    except Exception as e:
        return f"Error al extraer texto: {str(e)}"

if __name__ == "__main__":
    pdf_path = "/home/ubuntu/upload/Pauta Felipe Aguilar control 6.pdf"
    extracted_text = extract_text_from_pdf(pdf_path)
    
    # Guardar el texto extraído en un archivo
    output_path = "/home/ubuntu/pauta_nutricional.txt"
    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.write(extracted_text)
    
    print(f"Texto extraído y guardado en {output_path}")
