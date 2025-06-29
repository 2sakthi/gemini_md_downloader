// background.js (v1.2 with logging)

chrome.action.onClicked.addListener((tab) => {
  console.log("[GEMINI-DOWNLOADER-BG] Icon clicked.");
  console.log("[GEMINI-DOWNLOADER-BG] Current tab URL:", tab.url);

  // Ensure we are on a Gemini page before sending the message
  if (tab.url && tab.url.startsWith("https://gemini.google.com")) {
    console.log("[GEMINI-DOWNLOADER-BG] Gemini page confirmed. Sending message to content script.");
    chrome.tabs.sendMessage(tab.id, { action: "download_markdown" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("[GEMINI-DOWNLOADER-BG] Error sending message:", chrome.runtime.lastError.message);
      } else {
        console.log("[GEMINI-DOWNLOADER-BG] Response from content script:", response?.status);
      }
    });
  }
});
