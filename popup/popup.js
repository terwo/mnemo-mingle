// The popup shows up directly to the right of the highlighted text
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     document.querySelector('.popup-content').innerText = request.selectedText;
// });

var newheight = window.height * (5 / 10);
var newwidth = window.width * (7 / 10);
window.resizeTo(newheight, newwidth);