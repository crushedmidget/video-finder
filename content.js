// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is from the popup
  if (sender.id === chrome.runtime.id) {
    // Handle the message
    console.log(request); // Check if the command is “scan”
    if (request.command === "scan") {
      // Call the scanForVideos
      function scanForVideos() {
        // Get all video elements in the document
        const videos = document.getElementsByTagName("video");
        // Create an empty array to store video sources
        let videoSources = [];
        // Loop through each video element
        for (let i = 0; i < videos.length; i++) {
          // Get the source attribute of the video element
          let source = videos[i].getAttribute("src");
          // If there is no source attribute, get the source element inside the video element
          if (!source) {
            let sourceElement = videos[i].querySelector("source");

            // If there is a source element, get its source attribute
            if (sourceElement) {
              source = sourceElement.getAttribute("src");
            }
          }
          // If there is a source attribute, push it to the video sources array
          if (source) {
            videoSources.push(source);
          }
        }

        // Create a message with the video sources
        let message = "Found " + videoSources.length + " videos:\n";
        for (let i = 0; i < videoSources.length; i++) {
          message += videoSources[i] + "\n";
        }

        // Send a message to the popup with the video sources
        chrome.runtime.sendMessage({ message: message });
      }
      scanForVideos();
      // Send a response back to the popup
      sendResponse({ message: "Scanning for videos…" });
    }
  }
});

// Scan for videos function
function scanForVideos() {
  // Get all video elements in the document
  const videos = document.getElementsByTagName("video");
  // Create an empty array to store video sources
  let videoSources = [];
  // Loop through each video element
  for (let i = 0; i < videos.length; i++) {
    // Get the source attribute of the video element
    let source = videos[i].getAttribute("src");
    // If there is no source attribute, get the source element inside the video element
    if (!source) {
      let sourceElement = videos[i].querySelector("source");

      // If there is a source element, get its source attribute
      if (sourceElement) {
        source = sourceElement.getAttribute("src");
      }
    }
    // If there is a source attribute, push it to the video sources array
    if (source) {
      videoSources.push(source);
    }
  }

  // Create a message with the video sources
  let message = "Found " + videoSources.length + " videos:\n";
  for (let i = 0; i < videoSources.length; i++) {
    message += videoSources[i] + "\n";
  }

  // Send a message to the popup with the video sources
  chrome.runtime.sendMessage({ message: message });
}
