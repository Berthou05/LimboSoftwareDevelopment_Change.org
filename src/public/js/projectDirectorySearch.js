const initAddMemberAutocomplete = function initAddMemberAutocomplete() {
    const showBtn = document.getElementById('showAddMember');
    const panel = document.getElementById('addMemberPanel');
    if (!showBtn || !panel) return;

    showBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            const input = panel.querySelector('.add-member-search');
            if (input) input.focus();
        }
    });

    const form = panel.querySelector('form');
    const searchInput = panel.querySelector('.add-member-search');
    const hiddenInput = panel.querySelector('.add-member-id');
    const resultsPanel = panel.querySelector('.add-member-results');
    const catalogNode = panel.querySelector('.add-member-catalog');
    if (!form || !searchInput || !hiddenInput || !resultsPanel || !catalogNode) return;

    let catalog = [];
    try {
        catalog = JSON.parse(catalogNode.textContent || '[]');
    } catch (e) { return; }

    const normalize = v => String(v || '').trim().toLowerCase();
    const findExact = q => catalog.find(emp => normalize(emp.label) === normalize(q));
    const renderSuggestions = q => {
        const normQ = normalize(q);
        const matches = catalog.filter(emp => normalize(emp.label).includes(normQ)).slice(0, 8);
        resultsPanel.innerHTML = '';
        if (!matches.length) {
            const p = document.createElement('p');
            p.className = 'px-2 py-2 text-sm text-brand-text/60';
            p.textContent = 'No matches found.';
            resultsPanel.appendChild(p);
            resultsPanel.classList.remove('hidden');
            return;
        }
        for (const emp of matches) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'block w-full rounded-lg px-2 py-2 text-left text-sm font-medium text-brand-text transition hover:bg-brand-secondary/30';
            btn.textContent = emp.label;
            btn.addEventListener('mousedown', e => e.preventDefault());
            btn.addEventListener('click', () => {
                hiddenInput.value = emp.id;
                searchInput.value = emp.label;
                searchInput.setCustomValidity('');
                resultsPanel.classList.add('hidden');
            });
            resultsPanel.appendChild(btn);
        }
        resultsPanel.classList.remove('hidden');
    };
    const syncHidden = () => {
        const exact = findExact(searchInput.value);
        hiddenInput.value = exact ? exact.id : '';
    };
    searchInput.addEventListener('input', () => {
        syncHidden();
        searchInput.setCustomValidity('');
        renderSuggestions(searchInput.value);
    });
    searchInput.addEventListener('focus', () => {
        renderSuggestions(searchInput.value);
    });
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !showBtn.contains(e.target)) {
            resultsPanel.classList.add('hidden');
        }
    });
    form.addEventListener('submit', (e) => {
        syncHidden();
        if (hiddenInput.value) {
            searchInput.setCustomValidity('');
            return;
        }
        e.preventDefault();
        searchInput.setCustomValidity('Select a specific employee from the suggestions.');
        searchInput.reportValidity();
    });
    resultsPanel.classList.add('hidden');
};
// Initialize add member autocomplete on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initAddMemberAutocomplete();
});