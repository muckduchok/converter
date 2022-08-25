/*global chrome*/

function createHtml(uah, usd, pln) {
  return `<div id="converterPopup" style="position: fixed;top: 50%;left: 50%;min-width:120px;width: max-content;height: max-content;background: #282c34;padding: 10px;border-radius: 15px;display: flex;align-items: center;flex-direction: column;color: white;">
        <div style="display: flex; justify-content: space-around; width: 100%">
          <span>UAH:</span><span>${uah}</span>
        </div>
        <div style="display: flex; justify-content: space-around; width: 100%">
          <span>USD:</span><span>${usd}</span>
        </div>
        <div style="display: flex; justify-content: space-around; width: 100%">
          <span>PLN:</span><span>${pln}</span>
        </div>
  </div>`
}

document.addEventListener('mouseup', async (e) => {
  let selected = document.getSelection().toString();
  if (selected.length > 0) {
    chrome.storage.sync.get(['currency'], function(result) {
      console.log('Value currently is ' + result);
    });

    let uah = parseInt(selected);
    let usd = (parseInt(selected) / 37).toFixed(2);
    let pln = (parseInt(selected) / 7.71).toFixed(2);
    if (!isNaN(usd)) {
      document.body.insertAdjacentHTML('beforeend',`${createHtml(uah, usd, pln)}`)
    }
  }
})

document.addEventListener('mousedown', async (e) => {
  document.querySelectorAll('#converterPopup').forEach((pop) => {
    if (e.target.id !== 'converterPopup') {
      pop.remove()
    }
  });
})