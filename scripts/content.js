let overlay = null;
// does ^ need to be null?

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("In content.js!");
  if (request.action === "triggerMingle") {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      console.log("Here in triggerMingle");
      showOverlayWithHighlightedText(selection);
      callImageApi(selection.toString());
      callTextApi(selection.toString());


    }
  }
});

function showOverlayWithHighlightedText(selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.left = `${rect.left + window.scrollX}px`;
  overlay.style.top = `${rect.bottom + window.scrollY}px`;
  overlay.style.backgroundColor = "orange";
  overlay.style.zIndex = "10000";
  overlay.style.padding = '10px';
  overlay.style.borderRadius = '5px';
  overlay.textContent = `Loading mnemonic for ${selection.toString()}`;

  document.body.appendChild(overlay);
}

function updateOverlayWithMnemonic(mnemonic) {
  if (overlay) {
    overlay.textContent = mnemonic;
  }
}

function updateOverlayWithImage(image) {
  if (overlay) {
    const imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.style.width = '100px'; // Adjust as needed

    overlay.appendChild(imageElement);
  }

}

document.addEventListener('click', function (event) {
  if (overlay && !overlay.contains(event.target)) {
    overlay.remove();
  }
});

async function callTextApi(selectedText) {
  const prompt = `${selectedText}`;
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'chatCompletion',
      prompt,
    },
    response => {
      console.log(response);
      updateOverlayWithMnemonic(response.choices[0].message.content);
    });

}

async function callImageApi(selectedText) {
  const prompt = `${selectedText}`;
  chrome.runtime.sendMessage(
    {
      contentScriptQuery: 'imageCompletion',
      prompt,
    },
    response => {
      console.log(response);
      updateOverlayWithImage(response.data[0].url);
    });
}