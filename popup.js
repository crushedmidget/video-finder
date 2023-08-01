document.addEventListener('DOMContentLoaded', function () {
    const scanButton = document.getElementById('scanButton');
    const videoList = document.getElementById('videoList');
  
    scanButton.addEventListener('click', function () {
        videoList.innerHTML = ''; // Clear previous list items
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs && tabs.length > 0) {
            const currentTab = tabs[0];
            chrome.scripting.executeScript({
              target: { tabId: currentTab.id },
              function: scanForVideos,
            });
          } else {
            console.error('No active tabs found.');
          }
        });
      });
  
    // Function to scan the DOM for video elements
    function scanForVideos() {
      const videos = document.querySelectorAll('video');
      console.log(videos);
      const videoArray = Array.from(videos);
  
      // Sort the videos by size in descending order
      videoArray.sort((a, b) => b.videoWidth * b.videoHeight - a.videoWidth * a.videoHeight);
  
      const videoLinks = videoArray.map((video) => {
        const source = video.currentSrc;
        const resolution = `${video.videoWidth}x${video.videoHeight}`;
        return { source, resolution };
      });
      console.log(videoLinks);
  
      return videoLinks;
    }
  
    // Function to display the list of videos
    function displayVideos(videoLinks) {
      videoLinks.forEach((video) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${video.resolution} - ${video.source}`;
        listItem.addEventListener('click', function () {
          // Trigger download when clicked
          chrome.downloads.download({ url: video.source });
        });
        videoList.appendChild(listItem);
      });
    }
  
    // Listen for messages from the content script
    chrome.runtime.onMessage.addListener(function (message) {
      if (message.action === 'videoLinks') {
        displayVideos(message.videoLinks);
      }
    });
  });

  