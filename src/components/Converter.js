import React from 'react';
import css from '../styles/app.module.css';

const Converter = ({currency, changeRates, deleteItem, recently}) => {

  return (
    <>
    <hr className={css.hr} />
    {recently.length > 0 ?
      <div className="block">
        {Object.keys(currency).map((keyName) => (
            <div className={css.blockItems} key={keyName}>
              <div className={css.blockItemsTitle}>
                <label
                  className={css.blockLabel}
                  htmlFor={keyName}>{keyName}
                </label>
                <button onClick={() => deleteItem(keyName)} className={css.closeBtn}></button>
              </div>
              <input
                id={keyName}
                className={css.input}
                onChange={(e) => changeRates(e.target.valueAsNumber, keyName)}
                name={keyName}
                type="number"
                value={currency[keyName] || ''} />
            </div>
        ))}
        </div> :
        <div className={css.span}>Select currency in settings</div>
    }
    <hr className={css.hr} />
    </>
  );
};

export default Converter;