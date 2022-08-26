/*global chrome*/

let api_base = "https://api.exchangerate.host/latest?base=";

function createHtml(uah, usd, pln) {
  return `<div id="converterPopup" style="position: fixed;top: 50%;left: 50%;min-width:120px;width: max-content;height: max-content;background: #282c34;padding: 10px;border-radius: 15px;display: flex;align-items: center;flex-direction: column;color: white;z-index: 999999">
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

function showCalculateModal(rates) {
  let uah = rates["UAH"].toFixed(2)
  let usd = rates["USD"].toFixed(2);
  let pln = rates["PLN"].toFixed(2);
  if (!isNaN(uah)) {
    document.body.insertAdjacentHTML('beforeend',`${createHtml(uah, usd, pln)}`)
  }
}

document.addEventListener('mouseup', async () => {
  let amount = document.getSelection().toString().replace(/[^\d/.]/g, "");
  let isDot = amount[0] === '.';

  if (amount.length > 0 && !isDot) {
    chrome.storage.sync.get(['key'], function(cur) {
      fetch(api_base + `${cur.key}&symbols=USD,UAH,PLN&amount=` + amount)
          .then(r => r.text())
          .then(result => {
            let rates = JSON.parse(result)["rates"]
            showCalculateModal(rates);
          })
    });
  }
})

document.addEventListener('mousedown', async (e) => {
  document.querySelectorAll('#converterPopup').forEach((pop) => {
    if (e.target.id !== 'converterPopup') {
      pop.remove()
    }
  });
})