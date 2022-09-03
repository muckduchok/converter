/*global chrome*/

let api_base = "https://api.exchangerate.host/latest?base=";

function createHtml(uah, usd, pln) {
  return `<div id="converterPopup" style="position: fixed;top: 50%;left: 50%;min-width:120px;width: max-content;height: max-content;background: #282c34;padding: 10px;border-radius: 15px;display: flex;align-items: center;flex-direction: column;color: white;z-index: 999999">
        <div style="display: flex; justify-content: space-around; width: 100%">
          <button style="color: darkseagreen;border: none;background: transparent;cursor: pointer;" class="cur-btn" value="UAH">&#10003;</button>
          <span>UAH:</span><span>${uah}</span>
        </div>
        <div style="display: flex; justify-content: space-around; width: 100%">
          <button style="color: darkseagreen;border: none;background: transparent;cursor: pointer;" class="cur-btn" value="USD">&#10003;</button>
          <span>USD:</span><span>${usd}</span>
        </div>
        <div style="display: flex; justify-content: space-around; width: 100%">
          <button style="color: darkseagreen;border: none;background: transparent;cursor: pointer;" class="cur-btn" value="PLN">&#10003;</button>
          <span>PLN:</span><span>${pln}</span>
        </div>
  </div>`
}

async function getCurrencies(amount, currency) {
    fetch(api_base + `${currency}&symbols=USD,UAH,PLN&amount=` + amount)
        .then(r => r.text())
        .then(result => {
            let rates = JSON.parse(result)["rates"]
            console.log('results', rates)

            showCalculateModal(rates, amount);
        })
}

function showCalculateModal(rates, amount) {
  let uah = rates["UAH"].toFixed(2)
  let usd = rates["USD"].toFixed(2);
  let pln = rates["PLN"].toFixed(2);
  if (!isNaN(uah)) {
    document.body.insertAdjacentHTML('beforeend',`${createHtml(uah, usd, pln)}`)
    reSelectListener(amount);
  }
}

document.addEventListener('mouseup', async () => {
    chrome.storage.sync.get(['search'], function({search}) {
        let reg = search ? /[^\d/.]/g : ' ',
            amount = document.getSelection().toString().replace(reg, ''),
            isDot = amount[0] === '.';

        if (amount.length > 0 && !isDot) {
          chrome.storage.sync.get(['key'], function({key}) {
              getCurrencies(amount, key);
          });
        }
    });
})

document.addEventListener('mousedown', async (e) => {
  document.querySelectorAll('#converterPopup').forEach((pop) => {
    if (e.target.id !== 'converterPopup' && e.target.localName !== 'button') {
      pop.remove()
    }
  });
})

function reSelectListener(amount) {
    let plusButtons = document.querySelectorAll('.cur-btn');
    plusButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
        let type = e.target.value;
            setTimeout(() => {
                getCurrencies(amount, type);
                // setTimeout(() => {
                //     document.querySelectorAll('.cur-btn')
                //         .forEach(btn => btn.remove());
                // }, 100)
            }, 300)
        })
    })
}