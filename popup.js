// Get the scan button element
const scanButton = document.getElementById("scanButton");

// Add a click event listener
scanButton.addEventListener("click", () => {
  console.log("Clicked scan button");
  // Get the current tab c
  hrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
    // Send a message to the content script with a command
    chrome.tabs.sendMessage(tabs[0].id, { command: "scan" }, (response) => {
      // Handle the response from the content script
      console.log(response);
      // Display the results in the popup
      const results = document.getElementById("results");
      results.innerHTML = response.message;
    });
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is from the content script
  if (sender.tab && sender.origin === "chrome-extension://") {
    // Handle the message console.log(request);
    // Display the message in the popup
    const results = document.getElementById("results");
    results.innerHTML = request.message;
  }
});
