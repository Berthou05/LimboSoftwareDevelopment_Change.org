function cleanText(text) {
    return text
        .replace(/\s+/g, ' ')   // collapse multiple spaces
        .replace(/\n+/g, '\n')  // normalize line breaks
        .trim();
}

function buildReportText() {
    let output = '';

    // -------- HEADER (title + range) --------
    const reportTitle = document.querySelector('[data-report-title]')?.textContent.trim();
    const rangeText = document.querySelector('[data-report-range]')?.textContent.trim();

    if (reportTitle) {
        output += `${reportTitle}\n`;
    }

    if (rangeText) {
        output += `${rangeText}\n`;
    }

    output += '\n';

    // -------- SECTIONS --------
    document.querySelectorAll('#report-content section').forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim();
        if (!title) return;

        output += `=== ${title} ===\n`;

        const content = section.querySelector('[data-content]');
        if (!content) return;

        // Groups
        const groups = content.querySelectorAll('h3');
        if (groups.length > 0) {
            groups.forEach(group => {
                const groupTitle = cleanText(group.textContent);
                output += `\n${groupTitle}\n`;

                // Items under this group
                let el = group.nextElementSibling;

                while (el && el.tagName !== 'H3') {
                    if (el.tagName === 'UL') {
                        el.querySelectorAll('li').forEach(li => {
                            output += `- ${cleanText(li.textContent)}\n`;
                        });
                    }
                    el = el.nextElementSibling;
                }
            });
        } else {
            // Flat list
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


document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.querySelector('.js-copy-report');
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
        const report = document.getElementById('report-content');
        if (!report) return;

        const text = buildReportText();

        const success = await copyText(text);

        copyBtn.innerText = success ? 'Copied!' : 'Failed to copy';

        setTimeout(() => {
            copyBtn.innerText = 'Copy report';
        }, 2000);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('[data-toggle-section]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.closest('section');
            const content = section.querySelector('[data-content]');
            const icon = button.querySelector('[data-icon]');

            if (!content) return;
            const isHidden = content.classList.contains('hidden');
            content.classList.toggle('hidden');
            button.classList.toggle('border-b', isHidden);

            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });

        // Open first section
    if (buttons.length > 0) {
        const firstContent = buttons[0]
            .closest('section')
            .querySelector('[data-content]');
        
        if (firstContent){
            firstContent.classList.remove('hidden');
            buttons[0].classList.add('border-b');
            buttons[0].querySelector('[data-icon]').classList.toggle('rotate-180');
        }
    }
});