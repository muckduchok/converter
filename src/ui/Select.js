import React from 'react';

const Select = ({list, settings, defaultCurrency}) => {
    return (
        <select
            onChange={(e) => defaultCurrency(e.target.value)}
            value={settings.defaultCurrency}>
            {settings.recently?.length > 0 ?
                <>
                    <option disabled>Recently choices</option>
                    <option disabled>-------------------</option>
                    {settings.recently.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                    <option disabled>-------------------</option>
                </>
                : settings.recently
            }
            {list.map((rate) => (
                <option key={rate.code} value={rate.code}>
                    {rate.code} - {rate.name}
                </option>
            ))}
        </select>
    );
};

export default Select;