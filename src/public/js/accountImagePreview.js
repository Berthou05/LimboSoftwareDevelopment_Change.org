const fileInput = document.getElementById('accountImageFile');
const filenameLabel = document.getElementById('accountImageFilename');
const preview = document.getElementById('accountImagePreview');
const currentImageInput = document.getElementById('accountImageValue');
const menuButton = document.getElementById('accountImageMenuButton');
const menu = document.getElementById('accountImageMenu');
const uploadButton = document.getElementById('accountImageUploadButton');
const removeButton = document.getElementById('accountImageRemoveButton');

const closeImageMenu = () => {
    if (menu) {
        menu.classList.add('hidden');
    }

    if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'false');
    }
};

const openImageMenu = () => {
    if (menu) {
        menu.classList.remove('hidden');
    }

    if (menuButton) {
        menuButton.setAttribute('aria-expanded', 'true');
    }
};

if (fileInput && preview) {
    fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];

        if (!file) {
            filenameLabel && (filenameLabel.textContent = 'No file selected');
            return;
        }

        currentImageInput && (currentImageInput.value = '');
        const previewUrl = URL.createObjectURL(file);
        preview.onload = () => URL.revokeObjectURL(previewUrl);
        preview.src = previewUrl;
        preview.classList.remove('hidden');
        preview.style.display = ''; 
        filenameLabel && (filenameLabel.textContent = file.name);
    });
}

if (menuButton && menu) {
    menuButton.addEventListener('click', (event) => {
        event.stopPropagation();

        if (menu.classList.contains('hidden')) {
            openImageMenu();
            return;
        }

        closeImageMenu();
    });

    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            closeImageMenu();
        }
    });
}

if (uploadButton && fileInput) {
    uploadButton.addEventListener('click', () => {
        fileInput.click();
        closeImageMenu();
    });
}

if (removeButton && preview) {
    removeButton.addEventListener('click', () => {
        if (fileInput) {
            fileInput.value = '';
        }

        currentImageInput && (currentImageInput.value = '');
        filenameLabel && (filenameLabel.textContent = 'No file selected');
        
        preview.src = '';
        preview.classList.add('hidden');
        closeImageMenu();
    });
}
