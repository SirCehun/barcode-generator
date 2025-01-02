# Generátor čárových kódů

Moderní webová aplikace pro generování čárových kódů s možností jednotlivého i hromadného generování.

## Funkce

- **Jednotlivý kód**
  - Generování jednoho čárového kódu
  - Okamžitý náhled
  - Možnost stažení ve formátu SVG

- **Hromadné generování**
  - Ruční zadání více kódů
  - Import z CSV souboru
  - Náhled prvního kódu
  - Stažení všech kódů v ZIP archivu

- **Další funkce**
  - Přepínání mezi tmavým a světlým režimem
  - Responzivní design
  - Moderní uživatelské rozhraní
  - Optimalizováno pro všechny moderní prohlížeče

## Technologie

- **Backend**
  - Python 3.x
  - Flask
  - python-barcode

- **Frontend**
  - HTML5
  - CSS3 (s podporou moderních vlastností)
  - JavaScript (ES6+)
  - Bootstrap 5
  - Bootstrap Icons
  - Google Fonts (Overpass)

## Instalace

1. Naklonujte repozitář:
   ```bash
   git clone <url-repozitáře>
   cd barcode_generator
   ```

2. Vytvořte a aktivujte virtuální prostředí:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Pro Linux/Mac
   # nebo
   venv\Scripts\activate  # Pro Windows
   ```

3. Nainstalujte závislosti:
   ```bash
   pip install -r requirements.txt
   ```

## Spuštění

1. Aktivujte virtuální prostředí (pokud již není aktivní):
   ```bash
   source venv/bin/activate  # Pro Linux/Mac
   # nebo
   venv\Scripts\activate  # Pro Windows
   ```

2. Spusťte aplikaci:
   ```bash
   python app.py
   ```

3. Otevřete prohlížeč a přejděte na:
   ```
   http://localhost:5014
   ```

## Použití

### Jednotlivý kód
1. Zadejte text pro čárový kód
2. Počkejte na vygenerování náhledu
3. Klikněte na "Stáhnout" pro uložení SVG souboru

### Hromadné generování
1. Vyberte způsob zadání:
   - **Ruční zadání**: Zadejte kódy, každý na nový řádek
   - **CSV soubor**: Nahrajte CSV soubor s kódy v prvním sloupci
2. Zkontrolujte náhled prvního kódu
3. Klikněte na "Stáhnout ZIP" pro stažení všech kódů

### Přepínání tématu
- Klikněte na ikonu měsíce/slunce v pravém horním rohu pro přepnutí mezi tmavým a světlým režimem
- Vaše preference bude uložena pro příští návštěvu

## Podporované prohlížeče
- Google Chrome (doporučeno)
- Mozilla Firefox
- Safari
- Microsoft Edge

## Licence

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
