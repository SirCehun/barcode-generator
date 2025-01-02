from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import barcode
from barcode.writer import SVGWriter
from io import BytesIO, StringIO
import pandas as pd
import zipfile
import json
import csv
import base64

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

def get_settings_from_request():
    """Získá nastavení z požadavku"""
    if request.is_json:
        data = request.get_json()
        print("JSON data:", data)
        return {
            'width': float(data.get('width', 0.2)),
            'height': float(data.get('height', 15.0)),
            'font_size': int(data.get('fontSize', 10)),
            'font_family': data.get('fontFamily', 'Arial'),
            'text_color': data.get('textColor', '#000000')
        }
    else:
        data = request.form
        print("Form data:", data)
        return {
            'width': float(data.get('width', 0.2)),
            'height': float(data.get('height', 15.0)),
            'font_size': int(data.get('fontSize', 10)),
            'font_family': data.get('fontFamily', 'Arial'),
            'text_color': data.get('textColor', '#000000')
        }

def generate_barcode_data(text, width=0.2, height=15.0, font_size=10, font_family='Arial', text_color='#000000'):
    try:
        print("Generating barcode with settings:", {
            'text': text,
            'width': width,
            'height': height,
            'font_size': font_size,
            'font_family': font_family,
            'text_color': text_color
        })

        # Vytvoření vlastního writeru s nastavenými parametry
        writer = SVGWriter()
        writer.set_options({
            'module_width': width,
            'module_height': height,
            'font_size': font_size,
            'text_distance': 5.0,
            'font_family': font_family,
            'foreground': text_color,
            'background': None  # Průhledné pozadí
        })

        # Generování čárového kódu
        code128 = barcode.get('code128', text, writer=writer)
        stream = BytesIO()
        code128.write(stream)
        stream.seek(0)
        return stream.getvalue()
    except Exception as e:
        print(f"Error generating barcode: {str(e)}")
        raise e

def generate_barcode(text, width=0.2, height=15.0, font_size=10, font_family='Arial', text_color='#000000'):
    try:
        stream = BytesIO(generate_barcode_data(text, width, height, font_size, font_family, text_color))
        return send_file(
            stream,
            mimetype='image/svg+xml',
            as_attachment=False
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/generate', methods=['POST'])
def generate():
    try:
        print("\n=== Received generate request ===")
        if request.is_json:
            data = request.get_json()
            print("JSON data:", json.dumps(data, indent=2))
            
            # Získání textu podle typu požadavku
            text = data.get('text', '123456789')
            
            # Získání nastavení
            settings = get_settings_from_request()
            
            print("Generating barcode with settings:", {
                'text': text,
                'width': settings['width'],
                'height': settings['height'],
                'font_size': settings['font_size'],
                'font_family': settings['font_family'],
                'text_color': settings['text_color']
            })
            
            return generate_barcode(
                text=text,
                width=settings['width'],
                height=settings['height'],
                font_size=settings['font_size'],
                font_family=settings['font_family'],
                text_color=settings['text_color']
            )
        else:
            return jsonify({'error': 'Invalid request format'}), 400
            
    except Exception as e:
        print(f"Error in generate endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/bulk-generate', methods=['POST'])
def bulk_generate():
    try:
        print("\n=== Received bulk generate request ===")
        settings = get_settings_from_request()
        
        # Zpracování vstupních dat
        if 'file' in request.files:
            file = request.files['file']
            if file.filename.endswith('.csv'):
                # Čtení CSV souboru
                stream = StringIO(file.stream.read().decode("UTF8"), newline=None)
                codes = [row[0] for row in csv.reader(stream)]
            else:
                return jsonify({'error': 'Unsupported file type'}), 400
        else:
            data = request.get_json() if request.is_json else request.form
            codes = data.get('codes', '').split('\n')
        
        # Odstranění prázdných řádků a whitespace
        codes = [code.strip() for code in codes if code.strip()]
        
        if not codes:
            return jsonify({'error': 'No valid codes provided'}), 400
            
        # Vytvoření ZIP archivu
        memory_file = BytesIO()
        with zipfile.ZipFile(memory_file, 'w') as zf:
            for i, code in enumerate(codes):
                try:
                    # Generování čárového kódu
                    barcode_data = generate_barcode_data(
                        text=code,
                        width=settings['width'],
                        height=settings['height'],
                        font_size=settings['font_size'],
                        font_family=settings['font_family'],
                        text_color=settings['text_color']
                    )
                    
                    # Přidání do ZIP archivu
                    zf.writestr(f'barcode_{i+1}.svg', barcode_data)
                except Exception as e:
                    print(f"Error generating barcode for code {code}: {str(e)}")
                    continue
        
        memory_file.seek(0)
        return send_file(
            memory_file,
            mimetype='application/zip',
            as_attachment=True,
            download_name='barcodes.zip'
        )
        
    except Exception as e:
        print(f"Error in bulk generate endpoint: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5014, debug=True)
