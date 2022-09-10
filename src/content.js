/*global chrome*/
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Exchangerate from './services';

function Main() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(null);
  const [size, setSize] = useState(0)

  async function getRates(type, recently = ['USD', 'EUR'], amount) {
    const response = await new Exchangerate.getRates(type, recently, amount);
    setRates(response.rates);
    setAmount(amount);
    addModal(amount);
    setSize(Object.keys(response.rates).length);
  }

  function addModal(amount) {
    if (!isNaN(amount)) {
      document.body.appendChild(app);
    }
  }

  function selectOther(e, type) {
    e.stopPropagation();
    chrome.storage.sync.get(function({recently}) {
      setTimeout(() => getRates(type, recently, amount), 200);
    })
  }

  useEffect(() => {
    document.addEventListener('mouseup', async () => {
      chrome.storage.sync.get(function({search, currency, recently}) {
        let reg = search ? /[^\d/.]/g : ' ',
            amount = document.getSelection().toString().replace(reg, ''),
            isDot = amount[0] === '.';
        if (amount.length > 0 && !isDot && recently.length > 0) {
            getRates(currency, recently, amount);
        }
      });
    })
  }, []);

  return (
    <>
      {size <= 1 ?
      <div>Select more than one currency</div> :
      <div>
        {Object.keys(rates).map((keyName) => (
          <div class="currencies-items">
            <button
              onClick={(e) => selectOther(e, keyName)}
              class="cur-btn"
              value={keyName}>&#10003;</button>
            <p>{keyName}:</p><span>{rates[keyName].toFixed(2)}</span>
          </div>
        ))}
      </div>}
    </>
  )
}

document.addEventListener('mousedown', async (e) => {
  document.querySelectorAll('#converterPopup').forEach((pop) => {
    const checkModal = e.path.filter((dar) => dar.id === 'converterPopup');
    if (checkModal.length !== 1 && e.target.localName !== 'button') {
      pop.remove()
    }
  });
})

const app = document.createElement('div');
app.id = "converterPopup";
ReactDOM.render(<Main />, app);
