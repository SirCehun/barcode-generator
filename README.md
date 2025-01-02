# Generátor čárových kódů

Webová aplikace pro generování čárových kódů s možností jednotlivého i hromadného generování a přizpůsobení vzhledu.

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

- **Nastavení vzhledu**
  - Šířka a výška čárového kódu
  - Velikost a typ písma
  - Barva textu
  - Okamžitý náhled změn

## Technologie

- **Backend**
  - Python 3.x
  - Flask
  - python-barcode

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5
  - Bootstrap Icons

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

### Nastavení vzhledu
1. Upravte parametry podle potřeby:
   - Šířka modulu (0.1 - 1.0)
   - Výška (5 - 30 mm)
   - Font textu
   - Velikost fontu (6 - 20)
   - Barva textu
2. Sledujte změny v náhledu

## Licence

Tento projekt je licencován pod MIT licencí - viz soubor [LICENSE](LICENSE) pro detaily.
