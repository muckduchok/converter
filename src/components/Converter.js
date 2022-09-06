import React from 'react';
import css from './app.module.css';

const Converter = ({currency, changeRates}) => {
  return (
    <>
    <hr className={css.hr} />
      <div className="block">
        {Object.keys(currency).map((keyName, i) => (
            <div className={css.blockItems} key={keyName}>
              <label
                className={css.blockLabel}
                htmlFor={keyName}>
                  {keyName}
              </label>
              <input
                className={css.input}
                onChange={(e) => changeRates(e.target.valueAsNumber, keyName)}
                name={keyName}
                type="number"
                value={currency[keyName] || ''} />
            </div>
        ))}
        </div>
      <hr className={css.hr} />
    </>
  );
};

export default Converter;