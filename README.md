# MnemoMingle
A Chrome extension where you highlight words or characters and get example sentences, mnemonics, and generated images to help you familiarize yourself with new vocabulary.

This project was made through LaunchWeek, a program at the University of British Columbia where people gather and give life to their ideas, whether it just be a prototype or MVP.

This was my first time working with Chrome extensions, and I'm glad that I was able to put together a working solution among the 3 evening sessions of the program. When a "Cmd + Shift + F" is executed, the extension essentially sends the highlighted word to the backend, which calls the OpenAI API to generate text and image responses. With few-shot prompting, the model generates back fairly consistent responses.

What I struggled with the most was passing information from the client side to the backend service worker, where I eventaully realized I had to use the chrome.runtime.sendMessage and chrome.runtime.onMessage for proper message passing.

# Screenshots of UI
Mingling the word "menagerie," inspired by the short-story "The Paper Menagerie" by Ken Liu. A touching story of a son rekindling himself with his Chinese heritage after stumbling upon his late mother.
<img width="1197" alt="Screen Shot 2024-01-09 at 10 51 51 PM" src="https://github.com/terwo/mnemo-mingle/assets/105677497/b6285ce6-13d6-41de-83df-6894bdc9342f">

Mingling the word "philosophique," found on the official website for Le Petit Prince. A classic of world literature, whose messages about interpersonal relationships I firmly believe in.
<img width="1318" alt="Screen Shot 2024-01-09 at 10 45 42 PM" src="https://github.com/terwo/mnemo-mingle/assets/105677497/7f639cf3-1f5c-486a-a56a-b46d573ff66a">

Mingling the word "插嘴," which means to interrupt, from the reflective essay《背影》by Zhu Ziqing. The father's love he has for his son is expressed subtlety and sincerely through seemingly mundane events.
<img width="867" alt="Screen Shot 2024-01-09 at 10 48 24 PM" src="https://github.com/terwo/mnemo-mingle/assets/105677497/e124f765-e9ab-490e-b635-90de1016e4ba">


# Post-POC
1. Populate the definition part first with those found in dictionaries, for credibility.
2. Fine-tune my own text generation models to output satirical example sentences, which seem to be very memorable.
3. Fine-tune my own image generation model to accurately illustrate the word in question. For singular Chinese characters, have the characters strokes warped in a way that describe what it actually means.
4. Add the option to create accounts, and store words one has previously mingled.
5. Improve the user experience by implementing a user interface that is easier on the eyes and more intuitive
