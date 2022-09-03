/*global chrome*/

import React, {useCallback, useEffect, useState} from 'react';
import Settings from "./Settings";
import logo from '../images/logo.png';
import '../App.css';

const App = () => {
  const [currency, setCurrency] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
      recently: [],
      defaultCurrency: '',
      regSearch: false
  })
  const [uah, setUah] = useState('');
  const [usd, setUsd] = useState('');
  const [pln, setPln] = useState('');

  async function getCurrentCurrency() {
      const response = await fetch('https://api.monobank.ua/bank/currency')
      const otherRes = await fetch('https://api.exchangerate.host/latest?base=USD');
      const json2 = await otherRes.json();
      const json = await response.json();

      console.log('json2', json2.rates)
      setCurrency(json2.rates);


      console.log('currency', currency)

  }

  function handleCheckbox(value) {
      setSettings({...settings, regSearch: value});
      localStorage.setItem('search', value)
      chrome.storage && chrome.storage.sync.set({search: value});
  }

  function selectDefault(value) {
      let saveRecently = [...settings.recently, value];
      setSettings({...settings, defaultCurrency: value, recently: saveRecently});
      localStorage.setItem('recently', JSON.stringify(saveRecently));
      localStorage.setItem('current', value);
      chrome.storage && chrome.storage.sync.set({key: value});
  }

  const initSettings = useCallback(() => {
      let currency = localStorage.getItem('current') || 'UAH',
          recently = JSON.parse(localStorage.getItem('recently')) || [],
          search = JSON.parse(localStorage.getItem('search'));
      setSettings({regSearch: search, defaultCurrency: currency, recently: recently})
      chrome.storage && chrome.storage.sync.set({key: currency});
      chrome.storage && chrome.storage.sync.set({search: search});
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
    initSettings();
    getCurrentCurrency().then();
  }, [initSettings])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <hr />
          <div className="block">
              {Object.keys(currency).map((keyName, i) => (
                  <div key={keyName}>
                  <label className="block-label" htmlFor="uah">{keyName}</label>
                  <input onChange={(e) => changeUah(e.target.value)} name="uah" type="number" value={uah} />
                  </div>
                  // <li className="travelcompany-input" key={i}>
                  //     <span className="input-label">key: {i} Name: {subjects[keyName]}</span>
                  // </li>
              ))}
              {/*<label className="block-label" htmlFor="uah">UAH</label>*/}
              {/*<input onChange={(e) => changeUah(e.target.value)} name="uah" type="number" value={uah} />*/}
              {/*<label className="block-label" htmlFor="usd">USD</label>*/}
              {/*<input onChange={(e) => changeUsd(e.target.value)} name="usd" value={usd} type="number"/>*/}
              {/*<label className="block-label" htmlFor="usd">PLN</label>*/}
              {/*<input onChange={(e) => changePln(e.target.value)} name="pln" value={pln} type="number"/>*/}
          </div>
          <hr />
          <button title="Settings" onClick={() => setShowSettings(!showSettings)} className="btn-settings"></button>
          {showSettings &&
              <Settings defaultCurrency={selectDefault} handler={handleCheckbox} settings={settings}/>
          }
      </header>
    </div>
  );
}

export default App;
