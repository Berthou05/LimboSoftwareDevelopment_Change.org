function cleanText(text) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
}

function highlightButton(button) {
    if (!button) return;

    const icon = button.querySelector('svg');

    // Button background
    button.style.setProperty('background-color', '#fad14b', 'important');
    button.style.setProperty('opacity', '1', 'important');
    button.style.transform = 'scale(0.95)';
    button.style.transition = 'all 0.5s ease';

    // Icon color (THIS is the real fix)
    if (icon) {
        icon.style.setProperty('stroke', '#000000', 'important');
        icon.style.setProperty('color', '#000000', 'important');
    };

    setTimeout(() => {
        button.style.removeProperty('background-color');
        button.style.removeProperty('opacity');
        button.style.transform = '';

        if (icon) {
            icon.style.removeProperty('stroke');
            icon.style.removeProperty('color');
        }
    }, 600);


}

/* ----------------------------------
   GENERIC BUILDER (NEW)
---------------------------------- */

function buildTextFromRoot(root) {
    let output = '';
    if (!root) return '';

    const groups = root.querySelectorAll('h3');

    // ----------------------------------
    // ✅ CASE 1: HAS GROUPS (your current working case)
    // ----------------------------------
    if (groups.length > 0) {

        groups.forEach(group => {
            const title = cleanText(group.textContent);
            output += `\n${title}\n`;

            const container = group.closest('div').parentElement;
            if (!container) return;

            // -------- PROJECT GRID --------
            const grid = container.querySelector('.grid');
            if (grid) {
                grid.querySelectorAll(':scope > div').forEach(row => {
                    const text = cleanText(row.textContent);
                    if (text) output += `- ${text}\n`;
                });
            }

            // -------- SUBGROUPS --------
            const subgroups = container.querySelectorAll('h4');
            if (subgroups.length > 0) {
                subgroups.forEach(sub => {
                    const subTitle = cleanText(sub.textContent);
                    output += `  ${subTitle}\n`;

                    const subContainer = sub.parentElement;

                    subContainer.querySelectorAll('li').forEach(li => {
                        const text = cleanText(li.textContent);
                        if (text) output += `  - ${text}\n`;
                    });
                });

                return;
            }

            // -------- NORMAL LISTS --------
            container.querySelectorAll('li').forEach(li => {
                const text = cleanText(li.textContent);
                if (text) output += `- ${text}\n`;
            });
        });

    } else {

        // ----------------------------------
        // ✅ CASE 2: NO GROUPS (THIS IS YOUR BUG)
        // ----------------------------------

        root.querySelectorAll('li').forEach(li => {
            const text = cleanText(li.textContent);
            if (text) output += `- ${text}\n`;
        });
    }

    return output.trim();
}

/* ----------------------------------
   FULL REPORT (UNCHANGED BEHAVIOR)
---------------------------------- */
function buildReportText() {
    let output = '';

    // -------- HEADER --------
    const reportTitle = document.querySelector('[data-report-title]')?.textContent.trim();
    const rangeText = document.querySelector('[data-report-range]')?.textContent.trim();

    if (reportTitle) output += `${reportTitle}\n`;
    if (rangeText) output += `${rangeText}\n`;

    output += '\n';

    // -------- SECTIONS --------
    document.querySelectorAll('#report-content > div').forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim();
        if (!title) return;

        output += `=== ${title} ===\n`;

        const content = section.querySelector('[data-content]');
        if (!content) return;

        const sectionText = buildTextFromRoot(content);
        if (sectionText) output += sectionText + '\n\n';
    });

    return output.trim();
}

/* ----------------------------------
   SECTION COPY (NEW)
---------------------------------- */
function buildSectionText(section) {
    const title = section.querySelector('h2')?.textContent.trim();
    const content = section.querySelector('[data-section-content]');

    if (!content) return '';

    let output = '';
    if (title) output += `=== ${title} ===\n`;

    const text = buildTextFromRoot(content);
    if (text) output += text;

    return output.trim();
}

/* ----------------------------------
   PROJECT COPY (NEW)
---------------------------------- */
function buildProjectText(projectContainer) {
    if (!projectContainer) return '';

    let output = '';

    // TITLE
    const title = projectContainer.querySelector('h3')?.textContent.trim();
    if (title) output += `${title}\n`;

    const content = projectContainer.querySelector('[data-project-content]');
    if (!content) return output.trim();

    // STATUS GRID
    const grid = content.querySelector('.grid');
    if (grid) {
        grid.querySelectorAll(':scope > div').forEach(row => {
            const text = cleanText(row.textContent);
            if (text) output += `- ${text}\n`;
        });
    }

    // LIST ITEMS
    content.querySelectorAll('li').forEach(li => {
        const text = cleanText(li.textContent);
        if (text) output += `- ${text}\n`;
    });

    return output.trim();
}
/* ----------------------------------
   CLIPBOARD HELPERS (UNCHANGED)
---------------------------------- */
async function hasClipboardPermission() {
    try {
        if (!navigator.permissions) return false;

        const result = await navigator.permissions.query({ name: 'clipboard-write' });
        return result.state === 'granted' || result.state === 'prompt';
    } catch {
        return false;
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    let success = false;

    try {
        success = document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed', err);
    }

    document.body.removeChild(textarea);
    return success;
}

async function copyText(text) {
    const canUseClipboardAPI =
        typeof navigator !== 'undefined' &&
        navigator.clipboard &&
        window.isSecureContext;

    if (canUseClipboardAPI) {
        const hasPermission = await hasClipboardPermission();

        if (hasPermission) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch (err) {
                console.warn('Clipboard API failed, using fallback', err);
            }
        }
    }
    return fallbackCopy(text);
}

/* ----------------------------------
   BUTTON HANDLERS
---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    // -------- FULL REPORT --------
    const copyBtn = document.querySelector('[data-copy-report]');

    if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
            const text = buildReportText();
            const success = await copyText(text);

            copyBtn.innerText = success ? 'Copied!' : 'Failed to copy';

            setTimeout(() => {
                copyBtn.innerText = 'Copy';
            }, 2000);
        });
    }

    // -------- SECTION COPY --------
    document.querySelectorAll('[data-copy-section]').forEach(btn => {
        console.log(btn);
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();

            

            const section = btn.closest('.px-6.py-4');
            const text = buildSectionText(section);

            const success = await copyText(text);

            if (success) {
                highlightButton(btn);
            }
        });
    });

    // -------- PROJECT COPY --------
    document.querySelectorAll('[data-copy-project]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();

            const project = btn.closest('.space-y-5 > div'); // ✅ FIX

            const text = buildProjectText(project);
            const success = await copyText(text);

            if (success) {
                highlightButton(btn);
            }
        });
    });
});

/* ----------------------------------
   COLLAPSIBLE SECTIONS (UNCHANGED)
---------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-toggle-section]');

    buttons.forEach(button => {
        const container = button.closest('.px-6.py-4');
        const content = container?.querySelector('[data-content]');
        const icon = button.querySelector('[data-icon]');

        if (!content) return;

        // Open by default
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');

        button.addEventListener('click', () => {
            const isHidden = content.classList.contains('hidden');

            content.classList.toggle('hidden');

            if (icon) {
                icon.classList.toggle('rotate-180', isHidden);
            }
        });
    });
});