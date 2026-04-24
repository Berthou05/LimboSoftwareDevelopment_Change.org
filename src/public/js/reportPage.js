function cleanText(text) {
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
}

function buildReportText() {
    let output = '';

    // -------- HEADER --------
    const reportTitle = document.querySelector('[data-report-title]')?.textContent.trim();
    const rangeText = document.querySelector('[data-report-range]')?.textContent.trim();

    if (reportTitle) output += `${reportTitle}\n`;
    if (rangeText) output += `${rangeText}\n`;

    output += '\n';

    // -------- SECTIONS --------
    document.querySelectorAll('#report-content section').forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim();
        if (!title) return;

        output += `=== ${title} ===\n`;

        const content = section.querySelector('[data-content]');
        if (!content) return;

        // -------- GROUPS --------
        const groups = content.querySelectorAll('h3');

        if (groups.length > 0) {
            groups.forEach(group => {
                const groupTitle = cleanText(group.textContent);
                output += `\n${groupTitle}\n`;

                let el = group.nextElementSibling;

                while (el && el.tagName !== 'H3') {

                    // -------- STATUS BLOCK (NEW SUPPORT) --------
                    if (el.querySelector && el.querySelector('.grid')) {
                        const rows = el.querySelectorAll('.grid div');

                        rows.forEach(row => {
                            const text = cleanText(row.textContent);
                            if (text) output += `- ${text}\n`;
                        });
                    }

                    // -------- LISTS --------
                    if (el.tagName === 'UL') {
                        el.querySelectorAll('li').forEach(li => {
                            output += `- ${cleanText(li.textContent)}\n`;
                        });
                    }

                    el = el.nextElementSibling;
                }
            });

        } else {
            // -------- FLAT CONTENT --------
            content.querySelectorAll('li').forEach(li => {
                output += `- ${cleanText(li.textContent)}\n`;
            });
        }

        output += '\n';
    });

    return output.trim();
}

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

// -------- COPY BUTTON --------
document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('.js-copy-report');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const text = buildReportText();
        const success = await copyText(text);

        copyBtn.innerText = success ? 'Copied!' : 'Failed to copy';

        setTimeout(() => {
            copyBtn.innerText = 'Copy';
        }, 2000);
    });
});

// -------- COLLAPSIBLE SECTIONS --------
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-toggle-section]');

    buttons.forEach(button => {
        // ✅ FIX: use parent container (div), not section
        const container = button.parentElement;
        const content = container.querySelector('[data-content]');
        const icon = button.querySelector('[data-icon]');

        if (!content) return;

        // ✅ OPEN ALL BY DEFAULT
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');

        // Toggle behavior
        button.addEventListener('click', () => {
            const isHidden = content.classList.contains('hidden');

            content.classList.toggle('hidden');

            if (icon) {
                icon.classList.toggle('rotate-180', isHidden);
            }
        });
    });
});