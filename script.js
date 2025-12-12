/* script.js - Interactive functions for Libor's Repo v2.0 */

document.addEventListener('DOMContentLoaded', function() {

    // 1. DEFINICE IKON
    const iconCopy = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    const iconCheck = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    // 2. INICIALIZACE TLAČÍTEK (Přidá tlačítka ke všem příkazům po načtení)
    const commandItems = document.querySelectorAll('.command-list li');
    commandItems.forEach(item => {
        if (item.querySelector('code') && !item.querySelector('.copy-btn')) {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.innerHTML = iconCopy;
            btn.title = "Zkopírovat";
            item.appendChild(btn);
        }
    });

    // 3. UNIVERZÁLNÍ KOPÍROVÁNÍ (Event Delegation)
    // Díky tomuhle to funguje i na filtrované výsledky
    document.body.addEventListener('click', function(e) {
        // Zjistíme, zda bylo kliknuto na tlačítko kopírování (nebo jeho ikonu)
        const btn = e.target.closest('.copy-btn');

        if (btn) {
            const li = btn.closest('li');
            const code = li.querySelector('code');

            if (code) {
                const textToCopy = code.innerText;

                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback efekt
                    btn.innerHTML = iconCheck;
                    btn.style.borderColor = "var(--success)";
                    btn.style.color = "var(--success)";

                    setTimeout(() => {
                        btn.innerHTML = iconCopy;
                        btn.style.borderColor = "";
                        btn.style.color = "";
                    }, 2000);
                });
            }
        }
    });

    // 4. LIVE SEARCH LOGIKA (Google Style)
    const searchInput = document.getElementById('searchInput');
    const originalContent = document.getElementById('originalContent');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');

    if (searchInput && originalContent && searchResults && resultsList) {

        searchInput.addEventListener('input', function(e) {
            const term = e.target.value.toLowerCase().trim();

            if (term.length > 0) {
                // MÁME TEXT -> Přepneme do režimu hledání
                originalContent.style.display = 'none';
                searchResults.style.display = 'block';
                resultsList.innerHTML = ''; // Vyčistit předchozí výsledky

                // Najdeme všechny příkazy v původním obsahu
                const allCommands = originalContent.querySelectorAll('.command-list li');
                let matchCount = 0;

                allCommands.forEach(cmd => {
                    const text = cmd.textContent.toLowerCase();
                    // Pokud text obsahuje hledaný výraz
                    if (text.includes(term)) {
                        // Naklonujeme příkaz do výsledků
                        const clone = cmd.cloneNode(true);
                        resultsList.appendChild(clone);
                        matchCount++;
                    }
                });

                if (matchCount === 0) {
                    resultsList.innerHTML = '<li style="text-align:center; color: var(--text-muted); background: transparent; border:none;">Žádné příkazy nenalezeny.</li>';
                }

            } else {
                // PRÁZDNÝ INPUT -> Zobrazit původní kategorie
                originalContent.style.display = 'block';
                searchResults.style.display = 'none';
                resultsList.innerHTML = '';
            }
        });
    }
});
