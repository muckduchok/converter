/*global chrome*/
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Exchangerate from './services';

function Main() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(null);

  async function getRates(type, recently = ['USD', 'UAH', 'PLN'], amount) {
    const response = await new Exchangerate.getRates(type, recently, amount);
    setRates(response.rates);
    setAmount(amount);
    addModal(amount);
  }

  function addModal(amount) {
    if (!isNaN(amount)) {
      document.body.appendChild(app);
    }
  }

  function selectOther(e, type) {
    e.stopPropagation();
    setTimeout(() => getRates(type, ['USD', 'UAH', 'PLN'], amount), 200)
  }

  useEffect(() => {
    document.addEventListener('mouseup', async () => {
      chrome.storage.sync.get(['search'], function({search}) {
          let reg = search ? /[^\d/.]/g : ' ',
              amount = document.getSelection().toString().replace(reg, ''),
              isDot = amount[0] === '.';
  
          if (amount.length > 0 && !isDot) {
            chrome.storage.sync.get(['key'], function({key}) {
              getRates(key, ['USD', 'UAH', 'PLN'], amount)
            });
          }
      });
    })
  }, []);

  return (
    <>
      {Object.keys(rates).map((keyName) => (
          <div>
            <button onClick={(e) => selectOther(e, keyName)} class="cur-btn" value={keyName}>&#10003;</button>
            <span>{keyName}:</span><span>{rates[keyName].toFixed(2)}</span>
          </div>
        ))}
    </>
  )
}

document.addEventListener('mousedown', async (e) => {
  document.querySelectorAll('#converterPopup').forEach((pop) => {
    const checkModal = e.path.filter((dar) => dar.id === 'converterPopup')
    if (checkModal.length !== 1 && e.target.localName !== 'button') {
      pop.remove()
    }
  });
})

const app = document.createElement('div');
app.id = "converterPopup";
ReactDOM.render(<Main />, app);
