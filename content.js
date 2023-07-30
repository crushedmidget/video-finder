function scanForVideos() {
    // This function will be executed in the context of the page's DOM
    const videos = document.querySelectorAll('video');
    const videoArray = Array.from(videos);

    // Sort the videos by size in descending order
    videoArray.sort((a, b) => b.videoWidth * b.videoHeight - a.videoWidth * a.videoHeight);

    const videoLinks = videoArray.map((video) => {
        const source = video.currentSrc;
        const resolution = `${video.videoWidth}x${video.videoHeight}`;
        return { source, resolution };
    });

    // Send the sorted video links to the extension popup
    chrome.runtime.sendMessage({ action: 'videoLinks', videoLinks });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'scanForVideos') {
        scanForVideos();
    }
});
