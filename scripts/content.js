let overlay = null;
// does ^ need to be null?

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("In content.js!");
  if (request.action === "triggerMingle") {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      console.log("Here in triggerMingle");
      showOverlayWithHighlightedText(selection);
      callYourApi(selection.toString());
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
  // Create an img element
  //const imageElement = document.createElement('img');
  // Set the src attribute to the URL of your image
  // imageElement.src = 'images/person.png';
  // Add more image styling if needed
  // imageElement.style.width = '100px'; // Adjust as needed

  // overlay.appendChild(imageElement);

  document.body.appendChild(overlay);
}

function updateOverlayWithMnemonic(mnemonic) {
  if (overlay) {
    overlay.textContent = mnemonic;
  }
}

document.addEventListener('click', function (event) {
  if (overlay && !overlay.contains(event.target)) {
    overlay.remove();
  }
});

async function callYourApi(selectedText) {
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

  // fetch(`${apiUrl}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`
  //   },
  //   body: JSON.stringify({
  //     prompt: prompt,
  //     max_tokens: 60
  //   })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  //   updateOverlayWithMnemonic(data.choices[0].text);
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  //   updateOverlayWithMnemonic('Error fetching mnemonic');
  // });
}

