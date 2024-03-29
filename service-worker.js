chrome.commands.onCommand.addListener(function (command) {
  if (command === "mingle") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "triggerMingle" });
    });
  }
});

const apiKey = key;
const apiTextUrl = 'https://api.openai.com/v1/chat/completions';
const apiImageUrl = 'https://api.openai.com/v1/images/generations';

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log({ request, sender, sendResponse });
    if (request.contentScriptQuery == 'chatCompletion') {
      fetch(apiTextUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          messages: [{
            role: "system",
            content: "Answer in a consistent style, with 'definition' and 'sentence' always in English." +
              "The actual definition and sentence will be in the same language of the word I'm asking about. Make the example sentence funny but short."
          }, {
            role: "user",
            content: "noxious"
          }, {
            role: "assistant",
            content: "Definition: harmful, poisonous, or very unpleasant.\n" +
              "Sentence: The noxious odor from Uncle Ned's surprise casserole was so potent that even the dog demanded an apology."
          }, {
            role: "user",
            content: "未練"
          }, {
            role: "assistant",
            content: "Definition: 執心が残って思い切れないこと。あきらめきれないこと。また、そのさま。\n" +
              "Sentence: 古いぬいぐるみを処分すると、未練たるや！まるでそれが家を抜け出し、新しいオーナーに「ずっと一緒だったのに！」と泣きついているかのようだった。"
          }, {
            role: "user",
            content: request.prompt
          }],
          max_tokens: 150,
          model: "gpt-3.5-turbo",
        })
      })
        .then(response => response.json()).then(data => {
          console.log({ data })
          sendResponse(data);
        }).catch(error => {
          console.log({ error });
          sendResponse(error);
        })
      return true
    }
    if (request.contentScriptQuery == 'imageCompletion') {
      fetch(apiImageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: `A funny and satirical image about the word ${request.prompt}`,
          n: 1,
          size: "256x256",
          model: "dall-e-2"
        })
      })
        .then(response => response.json()).then(data => {
          console.log({ data })
          sendResponse(data);
        }).catch(error => {
          console.log({ error });
          sendResponse(error);
        })
      return true
    }
  }
);
