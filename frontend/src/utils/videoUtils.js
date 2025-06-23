export function getYouTubeThumbnail(url) {
    try {
        const videoId = new URL(url).searchParams.get('v');
        return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    } catch {
        return null;
    }
}
