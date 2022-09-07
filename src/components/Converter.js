import React from 'react';
import css from '../styles/app.module.css';

const Converter = ({currency, changeRates}) => {
  return (
    <>
    <hr className={css.hr} />
      <div className="block">
        {Object.keys(currency).map((keyName) => (
            <div className={css.blockItems} key={keyName}>
              <label
                className={css.blockLabel}
                htmlFor={keyName}>{keyName}
              </label>
              <input
                id={keyName}
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