/*global chrome*/

import React, {useCallback, useEffect, useState} from 'react';
import { currenciesHandler } from '../utils/currenciesHandler';
import { useDebounce } from '../hooks/useDebounce';
import SettingsButton from '../ui/Button';
import Exchangerate from '../services';
import Converter from './Converter';
import Settings from "./Settings";
import logo from '../images/logo.png';
import css from '../styles/app.module.css';

const App = () => {
  const [currency, setCurrency] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
      recently: [],
      defaultCurrency: '',
      regSearch: false
  });
  const [current, setCurrent] = useState({amount: null, rate: ''});
  const debounce = useDebounce(current.amount, 500);

  async function initCurrencies(type, list, amount) {
    const currencies = await Exchangerate.getRates(type,list,amount);
    const result = currenciesHandler(currencies, current);
    setCurrency(result.rates);
  }

  function handleCheckbox(value) {
    setSettings({...settings, regSearch: value});
    localStorage.setItem('search', value);
    chrome.storage && chrome.storage.sync.set({search: value});
  }

  function deleteItem(item) {
    let newRecently = settings.recently.filter((i) => i !== item);
    setSettings({...settings, recently: newRecently});
    localStorage.setItem('recently', JSON.stringify(newRecently));
    chrome.storage && chrome.storage.sync.set({recently: newRecently});
    if (settings.defaultCurrency === item) {
      setSettings({...settings, recently:newRecently, defaultCurrency: newRecently[0]});
      localStorage.setItem('current', newRecently[0]);
    }
  }

  function selectDefault(value) {
    let sameSelect = settings.recently.find((i) => i === value);
    if (sameSelect) {
      setSettings({...settings, defaultCurrency: value});
      localStorage.setItem('current', value);
      chrome.storage && chrome.storage.sync.set({currency: value});
      return
    }
    let saveRecently = [...settings.recently, value];
    setSettings({...settings, defaultCurrency: value, recently: saveRecently});
    localStorage.setItem('recently', JSON.stringify(saveRecently));
    localStorage.setItem('current', value);
    chrome.storage && chrome.storage.sync.set({currency: value, recently: saveRecently});
  }

  const initSettings = useCallback(() => {
    let currency = localStorage.getItem('current') || 'USD',
        recently = JSON.parse(localStorage.getItem('recently')) || [],
        search = JSON.parse(localStorage.getItem('search'));
    setSettings({regSearch: search, defaultCurrency: currency, recently: recently})
    chrome.storage && chrome.storage.sync.set(
      {currency: currency, search: search, recently: recently});
  }, [])

  function changeRates(value, keyName) {
    const newVal = {...currency, [keyName]:value};
    setCurrent({amount: value, rate: keyName});
    setCurrency(newVal);
  }

  useEffect(() => {
    initSettings();
  }, [])

  useEffect(() => {
    if (debounce) {
      initCurrencies(current.rate, settings.recently, debounce);
    }
  }, [debounce])

  useEffect(() => {
    if (settings.defaultCurrency && settings.recently) {
      const {defaultCurrency, recently} = settings;
      initCurrencies(defaultCurrency, recently);
    }
  }, [settings])

  return (
    <section className={css.AppHeader}>
      <img className={css.img} src={logo} alt="logo" />

      <Converter
        changeRates={changeRates}
        currency={currency}
        deleteItem={deleteItem}
        recently={settings.recently} />

      <SettingsButton setShowSettings={setShowSettings} showSettings={showSettings} />
      
      {showSettings &&
        <Settings
          defaultCurrency={selectDefault}
          handler={handleCheckbox}
          settings={settings}/>
      }
    </section>
  );
}

export default App;
