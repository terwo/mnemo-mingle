let overlay = null;
// does ^ need to be null?

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
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
  overlay.textContent = `Selected Text: ${selection.toString()}`;
  overlay.style.position = 'absolute';
  overlay.style.left = `${rect.left + window.scrollX}px`;
  overlay.style.top = `${rect.bottom + window.scrollY}px`;
  // Add more styling as needed

  document.body.appendChild(overlay);
}

function updateOverlayWithMnemonic(mnemonic) {
  if (overlay) {
    overlay.textContent = mnemonic;
  }
}

function callYourApi(selectedText) {
  const apiKey = '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';
  const prompt = `Create a mnemonic for the word '${selectedText}'`;

  fetch('https://api.openai.com/v1/models/gpt-3.5-turbo-instruct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 60
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    updateOverlayWithMnemonic(data.choices[0].text);
  })
  .catch((error) => {
    console.error('Error:', error);
    updateOverlayWithMnemonic('Error fetching mnemonic');
  });
}

