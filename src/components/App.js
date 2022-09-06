/*global chrome*/

import React, {useCallback, useEffect, useState} from 'react';
import Settings from "./Settings";
import logo from '../images/logo.png';
import Exchangerate from '../services';
import { useDebounce } from '../hooks/useDebounce';
import Converter from './Converter';
import { currenciesHandler } from '../utils/currenciesHandler';
import '../App.css';

const App = () => {
  const [currency, setCurrency] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
      recently: [],
      defaultCurrency: '',
      regSearch: false
  })
  const [current, setCurrent] = useState({amount: null, rate: ''});
  const debounce = useDebounce(current.amount, 500);

  async function initCurrencies(type, list, amount) {
    const currencies = await Exchangerate.getRates(type,list,amount);
    const result = currenciesHandler(currencies, current);
    setCurrency(result.rates);
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

  function changeRates(value, keyName) {
    const newVal = {...currency, [keyName]:value};
    setCurrent({amount: value, rate: keyName});
    setCurrency(newVal);
  }

  useEffect(() => {
    initSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (debounce) {
      initCurrencies(current.rate, settings.recently, debounce);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounce])

  useEffect(() => {
    if (settings.defaultCurrency && settings.recently) {
      const {defaultCurrency, recently} = settings;
      initCurrencies(defaultCurrency, recently);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />

        <Converter changeRates={changeRates} currency={currency} />

        <button
          title="Settings"
          onClick={() => setShowSettings(!showSettings)}
          className="btn-settings">
        </button>
        
        {showSettings &&
            <Settings
            defaultCurrency={selectDefault}
            handler={handleCheckbox}
            settings={settings}/>
        }
      </header>
    </div>
  );
}

export default App;
