import os
import fitz  # PyMuPDF
from flask import Flask, jsonify, render_template, send_from_directory

app = Flask(__name__)

PDF_DIR = "/pdfs"
COVER_CACHE_DIR = "/covers"

# Ensure the cache directory exists
os.makedirs(COVER_CACHE_DIR, exist_ok=True)

def get_pdf_files():
    """Scans the PDF directory and returns a structured list of files and folders."""
    folders = {}
    try:
        for item in os.scandir(PDF_DIR):
            if item.is_dir():
                folder_name = item.name
                if folder_name not in folders:
                    folders[folder_name] = []
                
                for sub_item in os.scandir(item.path):
                    if sub_item.is_file() and sub_item.name.lower().endswith('.pdf'):
                        relative_path = os.path.join(folder_name, sub_item.name)
                        file_path = f"/pdfs/{relative_path}"
                        cover_path = f"/covers/{relative_path}.png"
                        
                        folders[folder_name].append({
                            'name': sub_item.name,
                            'path': file_path,
                            'cover_url': cover_path
                        })
    except FileNotFoundError:
        print(f"Error: The directory {PDF_DIR} was not found.")
    
    return sorted(folders.items(), key=lambda x: x[0])

@app.route('/api/pdfs')
def pdf_list():
    """API endpoint to get the list of PDFs."""
    return jsonify(get_pdf_files())

@app.route('/covers/<path:filename>')
def get_cover(filename):
    """Generates and serves a cover image for a PDF."""
    # Sanitize filename to prevent directory traversal
    if '..' in filename or filename.startswith('/'):
        return "Invalid filename", 400

    cache_path = os.path.join(COVER_CACHE_DIR, f"{filename}.png")

    # If cover exists in cache, serve it
    if os.path.exists(cache_path):
        return send_from_directory(COVER_CACHE_DIR, f"{filename}.png")

    # If not, generate it
    pdf_path = os.path.join(PDF_DIR, filename)
    if not os.path.exists(pdf_path):
        return "PDF not found", 404

    try:
        doc = fitz.open(pdf_path)
        page = doc.load_page(0)  # First page
        pix = page.get_pixmap(dpi=150)
        
        # Ensure the subdirectory exists in the cache
        os.makedirs(os.path.dirname(cache_path), exist_ok=True)
        pix.save(cache_path)
        doc.close()
        return send_from_directory(COVER_CACHE_DIR, f"{filename}.png")
    except Exception as e:
        print(f"Error generating cover for {filename}: {e}")
        return "Error generating cover", 500

@app.route('/')
def index():
    """Serves the main HTML page."""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
