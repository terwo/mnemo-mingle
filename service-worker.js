chrome.commands.onCommand.addListener((command) => {
    if (command === 'mingle') {
        // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        //   chrome.tabs.sendMessage(tabs[0].id, { action: 'mingle' });
        // });
        console.log("Mingle");
      }
  });
  
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.action === "highlightText") {
//         chrome.tabs.sendMessage(sender.tab.id, { action: 'openPopup'});
//     }
// });

