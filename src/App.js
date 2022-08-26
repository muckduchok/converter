/*global chrome*/

import React, {useCallback, useEffect, useState} from 'react';
import logo from './images/logo.png';
import './App.css';

function App() {
  const [currency, setCurrency] = useState([]);
  const [settings, setSettings] = useState(false);
  const [currentSelect, setCurrentSelect] = useState('');
  const [uah, setUah] = useState('');
  const [usd, setUsd] = useState('');
  const [pln, setPln] = useState('');

  async function getCurrentCurrency() {
      const response = await fetch('https://api.monobank.ua/bank/currency')
      const json = await response.json();
      setCurrency(json);
  }

  function selectDefault(value) {
      setCurrentSelect(value);
      localStorage.setItem('current', value)
      chrome.storage && chrome.storage.sync.set({key: value});
  }

  const setDefaultCurrency = useCallback(() => {
      let currentAmount = localStorage.getItem('current') || 'UAH';
      setCurrentSelect(currentAmount);
      chrome.storage && chrome.storage.sync.set({key: currentAmount});
  }, [])

  function changeUah(value) {
      let usd = currency.filter((cur) => cur.currencyCodeA === 840);
      let pln = currency.filter((cur) => cur.currencyCodeA === 985);
      let convertUsd = (parseInt(value) / usd[0].rateSell).toFixed(2).toString();
      let convertPln = (parseInt(value) / pln[0].rateCross).toFixed(2).toString();

      setUah(value)
      setUsd(convertUsd)
      setPln(convertPln)
  }
  function changeUsd(value) {
      let usd = currency.filter((cur) => cur.currencyCodeA === 840);
      let convertUsd = (parseInt(value) * usd[0].rateSell).toFixed(2).toString();
      let convertPln = (parseInt(value) * 4.73).toFixed(2).toString();

      setUsd(value)
      setUah(convertUsd)
      setPln(convertPln)
  }
  function changePln(value) {
        let pln = currency.filter((cur) => cur.currencyCodeA === 985);
        let convertUah = (parseInt(value) * pln[0].rateCross).toFixed(2).toString();
        let convertPln = (parseInt(value) / 4.73).toFixed(2).toString();

        setPln(value)
        setUah(convertUah)
        setUsd(convertPln);
    }

  useEffect(() => {
    setDefaultCurrency();
    getCurrentCurrency().then();
  }, [setDefaultCurrency])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <hr />
          <div className="block">
              <label className="block-label" htmlFor="uah">UAH</label>
              <input onChange={(e) => changeUah(e.target.value)} name="uah" type="number" value={uah} />
              <label className="block-label" htmlFor="usd">USD</label>
              <input onChange={(e) => changeUsd(e.target.value)} name="usd" value={usd} type="number"/>
              <label className="block-label" htmlFor="usd">PLN</label>
              <input onChange={(e) => changePln(e.target.value)} name="pln" value={pln} type="number"/>
          </div>
          <hr />
          <button onClick={() => setSettings(!settings)} className="btn-settings"></button>
          {settings &&
              <div className="settings">
                  <span>Choice main сurrency</span>
                  <select onChange={(e) => selectDefault(e.target.value)} value={currentSelect}>
                      <option value="USD">USD</option>
                      <option value="UAH">UAH</option>
                      <option value="PLN">PLN</option>
                  </select>
              </div>
          }
      </header>
    </div>
  );
}

export default App;
