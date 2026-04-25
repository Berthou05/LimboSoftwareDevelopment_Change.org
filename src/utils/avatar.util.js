const DEFAULT_AVATAR = '';

const isGeneratedPlaceholderImage = function isGeneratedPlaceholderImage(image) {
    if (!image || typeof image !== 'string') return true;

    const normalized = image.trim().toLowerCase();

    return (
        normalized.includes('ui-avatars.com') ||
        normalized.includes('dicebear')
    );
};

const resolveAvatarImage = function resolveAvatarImage(image) {
    return isGeneratedPlaceholderImage(image) ? '' : image;
};

const getInitials = function getInitials(value, fallback = '?') {
    const initials = String(value || fallback)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

    return initials || fallback;
};

module.exports = {
    DEFAULT_AVATAR,
    getInitials,
    isGeneratedPlaceholderImage,
    resolveAvatarImage,
};
