function scanForVideos() {
    const videos = document.querySelectorAll('video');
    if (!videos || videos.length === 0) {
      console.log('No videos found on the page.');
      return [];
    }

    console.log('Number of videos found:', videos.length);
  
    const videoArray = Array.from(videos);
  
    // Sort the videos by size in descending order
    videoArray.sort((a, b) => b.videoWidth * b.videoHeight - a.videoWidth * a.videoHeight);
  
    const videoLinks = videoArray.map((video) => {
      const source = video.currentSrc;
      const resolution = `${video.videoWidth}x${video.videoHeight}`;
      return { source, resolution };
    });
  
    return videoLinks;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'scanForVideos') {
      const videoLinks = scanForVideos();
      // Send the result back to the popup
      chrome.runtime.sendMessage({ action: 'videoLinks', videoLinks });
    }
  });
  