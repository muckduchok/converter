/*global chrome*/

chrome.runtime.onInstalled.addListener(async () => {
  // const response = await fetch('https://api.monobank.ua/bank/currency');
  // const json = await response.json();
  // let obj = JSON.stringify({json});

  // chrome.storage.sync.set({currency: obj}, function() {
  //   console.log('Value is set to ' + response);
  // });

});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log('Selected: ', message.greeting)
//   if (message === 'get-user-data') {
//     sendResponse({ response: "Response from background script" });
//   }
// });