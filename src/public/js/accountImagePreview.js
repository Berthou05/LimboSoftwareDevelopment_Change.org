const fileInput = document.getElementById('accountImageFile');
const filenameLabel = document.getElementById('accountImageFilename');
const preview = document.getElementById('accountImagePreview');

if (fileInput && preview) {
    fileInput.addEventListener('change', () => {
        const file = fileInput.files?.[0];

        if (!file) {
            filenameLabel && (filenameLabel.textContent = 'No file selected');
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        preview.onload = () => URL.revokeObjectURL(previewUrl);
        preview.src = previewUrl;
        filenameLabel && (filenameLabel.textContent = file.name);
    });
}
