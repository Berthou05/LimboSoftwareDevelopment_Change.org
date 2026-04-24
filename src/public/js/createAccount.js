// --- ELEMENTS ---
const fileInput = document.getElementById('accountImageFile');
const preview = document.getElementById('accountImagePreview');
const fallback = document.getElementById('accountImageFallback');
const currentImageInput = document.getElementById('accountImageValue');

const menuButton = document.getElementById('accountImageMenuButton');
const menu = document.getElementById('accountImageMenu');
const uploadButton = document.getElementById('accountImageUploadButton');
const removeButton = document.getElementById('accountImageRemoveButton');

const namesInput = document.querySelector('input[name="names"]');
const lastnamesInput = document.querySelector('input[name="lastnames"]');

const passwordInput = document.getElementById("createAccountPassword");
const confirmInput  = document.getElementById("createAccountConfirmPassword");

// --- MENU TOGGLE ---
const closeMenu = () => {
    if (!menu || !menuButton) return;
    menu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
    if (!menu || !menuButton) return;
    menu.classList.remove('hidden');
    menuButton.setAttribute('aria-expanded', 'true');
};

if (menuButton && menu) {
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.contains('hidden') ? openMenu() : closeMenu();
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        closeMenu();
        }
    });
}


// --- INITIALS LOGIC ---
function getInitials(names, lastnames) {
    const full = `${names || ''} ${lastnames || ''}`.trim();

    if (!full) return '';

    return full
        .split(' ')
        .filter(Boolean)
        .map(p => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function updateAvatarFallback() {
    if (!fallback) return;

    const initials = getInitials(
        namesInput?.value,
        lastnamesInput?.value
    );

    fallback.textContent = initials || '';
}

// Listen to typing
if (namesInput && lastnamesInput) {
    namesInput.addEventListener('input', updateAvatarFallback);
    lastnamesInput.addEventListener('input', updateAvatarFallback);
}


// --- UPLOAD BUTTON (opens file picker) ---
if (uploadButton && fileInput) {
    uploadButton.addEventListener('click', () => {
        fileInput.click();
        closeMenu();
    });
}


// --- IMAGE PREVIEW (single clean handler) ---
if (fileInput && preview && fallback) {
    fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (!file) return;

        // Clear stored image value (server-side reference)
        if (currentImageInput) currentImageInput.value = '';

        const url = URL.createObjectURL(file);

        preview.onload = () => URL.revokeObjectURL(url);
        preview.src = url;

        preview.classList.remove('hidden');
        fallback.classList.add('hidden');
    });
}


// --- REMOVE IMAGE ---
if (removeButton && preview && fallback) {
    removeButton.addEventListener('click', () => {
        // Reset file input
        if (fileInput) fileInput.value = '';

        // Clear server-side reference
        if (currentImageInput) currentImageInput.value = '';

        // Hide image, show fallback
        preview.src = '';
        preview.classList.add('hidden');
        fallback.classList.remove('hidden');

        updateAvatarFallback(); // restore initials if any

        closeMenu();
    });
}


// --- INIT ---
updateAvatarFallback();

// Ensure correct initial state on load
if (preview && fallback) {
    if (preview.src && preview.src.trim() !== '' && !preview.classList.contains('hidden')) {
        fallback.classList.add('hidden');
    } else {
        preview.classList.add('hidden');
        fallback.classList.remove('hidden');
    }
}


document.querySelectorAll("[data-password-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
    const targetId = btn.dataset.passwordToggle;
    const input    = document.getElementById(targetId);
    const eyeOpen  = btn.querySelector("[data-eye-open]");
    const eyeClosed = btn.querySelector("[data-eye-closed]");

    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    eyeOpen.classList.toggle("hidden", isHidden);
    eyeClosed.classList.toggle("hidden", !isHidden);
    });
});

function generatePassword(length = 16) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";
    const array   = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (val) => charset[val % charset.length]).join("");
}

document.getElementById("generateAccountPasswordBtn").addEventListener("click", () => {
    const password       = generatePassword();
    const passwordInput  = document.getElementById("createAccountPassword");
    const confirmInput   = document.getElementById("createAccountConfirmPassword");
    const hint           = document.getElementById("generateAccountPasswordHint");

    passwordInput.value = password;
    confirmInput.value  = password;

    // Show the password temporarily so the user can see what was generated
    passwordInput.type = "password";
    confirmInput.type  = "password";

    // Sync eye icons to "visible" state on both fields
    document.querySelectorAll("[data-password-toggle]").forEach((btn) => {
        btn.querySelector("[data-eye-open]").classList.remove("hidden");
        btn.querySelector("[data-eye-closed]").classList.add("hidden");
    });

    hint.textContent = "Password copied to both fields.";
    setTimeout(() => { hint.textContent = ""; }, 3000);

    validatePasswordMatch();
});

function validatePasswordMatch() {
    const password = passwordInput.value;
    const confirm  = confirmInput.value;

    // Only validate once the confirm field has content
    if (!confirm) {
    passwordInput.classList.remove("border-green-500", "border-red-500");
    confirmInput.classList.remove("border-green-500", "border-red-500");
    return;
    }

    const match = password === confirm;

    passwordInput.classList.toggle("border-green-500", match);
    passwordInput.classList.toggle("border-red-500", !match);
    confirmInput.classList.toggle("border-green-500", match);
    confirmInput.classList.toggle("border-red-500", !match);
}

passwordInput.addEventListener("input", validatePasswordMatch);
confirmInput.addEventListener("input", validatePasswordMatch);