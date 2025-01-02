// Aktualizace náhledu ve všech záložkách
function updateAllPreviews() {
    const text = document.getElementById('text').value || '123456789';

    fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const url = URL.createObjectURL(blob);
        document.querySelectorAll('.preview-container').forEach(container => {
            container.innerHTML = ''; // Vyčistíme kontejner
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Barcode Preview';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            container.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelectorAll('.preview-container').forEach(container => {
            container.innerHTML = '<p class="error">Chyba při generování čárového kódu</p>';
        });
    });
}

// Event listenery pro všechny prvky s třídou preview-trigger
document.querySelectorAll('.preview-trigger').forEach(element => {
    element.addEventListener('input', updateAllPreviews);
    element.addEventListener('change', updateAllPreviews);
});

// Aktualizace náhledu pro jednotlivý kód
async function updateSinglePreview() {
    console.log('updateSinglePreview called');
    const text = document.getElementById('single-text')?.value || '123456789';

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                width: '0.2',
                height: '15.0',
                fontSize: '10',
                fontFamily: 'Arial',
                textColor: '#000000'
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const preview = document.getElementById('barcode-preview');
            if (preview) {
                preview.src = url;
            }
        }
    } catch (error) {
        console.error('Error updating single preview:', error);
    }
}

// Aktualizace náhledu pro hromadné generování
async function updateBulkPreview() {
    console.log('updateBulkPreview called');
    let text = '';

    if (document.getElementById('manual-input').checked) {
        const manualCodes = document.getElementById('manual-codes');
        if (manualCodes) {
            const lines = manualCodes.value.trim().split('\n');
            text = lines[0] || '123456789';
        }
    } else {
        const fileInput = document.getElementById('csv-file');
        if (fileInput?.files?.[0]) {
            const reader = new FileReader();
            reader.onload = async function(e) {
                const content = e.target.result;
                const lines = content.trim().split('\n');
                text = lines[0] || '123456789';
                await generateBulkPreview(text);
            };
            reader.readAsText(fileInput.files[0]);
            return;
        }
    }

    await generateBulkPreview(text);
}

async function generateBulkPreview(text) {
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                width: '0.2',
                height: '15.0',
                fontSize: '10',
                fontFamily: 'Arial',
                textColor: '#000000'
            })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const preview = document.getElementById('bulk-preview');
            if (preview) {
                preview.src = url;
                preview.style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error updating bulk preview:', error);
    }
}

// Funkce pro stažení jednotlivého čárového kódu
async function downloadBarcode() {
    const text = document.getElementById('single-text').value;
    const response = await fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: text,
            width: '0.2',
            height: '15.0',
            fontSize: '10',
            fontFamily: 'Arial',
            textColor: '#000000'
        })
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `barcode_${text}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Funkce pro stažení hromadně generovaných čárových kódů
async function downloadBulkBarcodes() {
    const formData = new FormData();
    
    if (document.getElementById('manual-input').checked) {
        const codes = document.getElementById('manual-codes').value;
        formData.append('codes', codes);
    } else {
        const file = document.getElementById('csv-file').files[0];
        if (file) {
            formData.append('file', file);
        }
    }

    const response = await fetch('/bulk-generate', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'barcodes.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Funkce pro přepínání tématu
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
}

// Funkce pro aktualizaci ikony přepínače tématu
function updateThemeToggleIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle i');
    if (theme === 'light') {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }
}

// Event listeners pro aktualizaci náhledů
document.addEventListener('DOMContentLoaded', function() {
    // Načtení uložené preference tématu
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    }

    // Jednotlivý kód
    const singleForm = document.getElementById('single-form');
    if (singleForm) {
        const textInput = document.getElementById('single-text');
        if (textInput) {
            textInput.addEventListener('input', updateSinglePreview);
        }
        updateSinglePreview();
    }

    // Hromadné generování
    const bulkForm = document.getElementById('bulk-form');
    if (bulkForm) {
        const manualInput = document.getElementById('manual-codes');
        const csvInput = document.getElementById('csv-file');
        const inputTypeRadios = bulkForm.querySelectorAll('input[name="input-type"]');

        if (manualInput) {
            manualInput.addEventListener('input', () => {
                if (document.getElementById('manual-input').checked) {
                    updateBulkPreview();
                }
            });
        }

        if (csvInput) {
            csvInput.addEventListener('change', () => {
                if (document.getElementById('csv-input').checked) {
                    updateBulkPreview();
                }
            });
        }

        inputTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const manualSection = document.getElementById('manual-section');
                const csvSection = document.getElementById('csv-section');
                const preview = document.getElementById('bulk-preview');
                
                if (radio.value === 'manual') {
                    manualSection.style.display = 'block';
                    csvSection.style.display = 'none';
                } else {
                    manualSection.style.display = 'none';
                    csvSection.style.display = 'block';
                }
                
                if (preview) {
                    preview.src = '';
                }
                
                updateBulkPreview();
            });
        });

        updateBulkPreview();
    }

    // Event listener pro přepínání záložek
    const tabLinks = document.querySelectorAll('button[data-bs-toggle="tab"]');
    tabLinks.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (e) {
            const targetId = e.target.getAttribute('data-bs-target');
            if (targetId === '#single') {
                updateSinglePreview();
            } else if (targetId === '#bulk') {
                updateBulkPreview();
            }
        });
    });
});
