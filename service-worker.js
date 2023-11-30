// function triggerOverlayAndApiCall() {
//   chrome.tabs.sendMessage(tab.id, {action: "triggerMingle"});
// }


chrome.commands.onCommand.addListener(function(command) {
  if (command === "mingle") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      chrome.tabs.sendMessage(tabs[0].id, {action: "triggerMingle"});
      // chrome.scripting.executeScript({
      //   target: { tabId: tabs[0].id },
      //   function: triggerOverlayAndApiCall
      // });
    });
  }
});


