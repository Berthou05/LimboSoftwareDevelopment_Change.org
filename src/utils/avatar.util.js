const DEFAULT_AVATAR = '/images/accounts/2026-04-13T18-43-46.235Z-avatar.png';

const isGeneratedPlaceholderImage = function isGeneratedPlaceholderImage(image) {
    if (!image || typeof image !== 'string') {
        return true;
    }

    return image.includes('ui-avatars.com') || image.includes('dicebear');
};

const resolveAvatarImage = function resolveAvatarImage(image) {
    return isGeneratedPlaceholderImage(image) ? DEFAULT_AVATAR : image;
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
