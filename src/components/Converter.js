import React from 'react';

const Converter = ({currency, changeRates}) => {
  return (
    <>
    <hr />
      <div className="block">
        {Object.keys(currency).map((keyName, i) => (
            <div className='block-items' key={keyName}>
              <label
                className="block-label"
                htmlFor={keyName}>
                  {keyName}
              </label>
              <input
                onChange={(e) => changeRates(e.target.valueAsNumber, keyName)}
                name={keyName}
                type="number"
                value={currency[keyName] || ''} />
            </div>
        ))}
        </div>
      <hr />
    </>
  );
};

export default Converter;