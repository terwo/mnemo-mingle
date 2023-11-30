chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'mingle') {
      // const selectedText = window.getSelection().toString();

    console.log("This is a popup!");
      
      // const popup = document.querySelector('.popup');
      // popup.classList.add('custom-popup');
      // popup.innerText = request.selectedText;

      // Adjust the positioning of the popup based on the highlighted text
      // const selection = window.getSelection();
      // const range = selection.getRangeAt(0);
      // const rect = range.getBoundingClientRect();
 
      // popup.style.position = 'absolute';
      // popup.style.top = rect.bottom + window.scrollY + 'px';
      // popup.style.left = rect.right + window.scrollX + 'px';
 
      // document.body.appendChild(popup);
    }

     
  });