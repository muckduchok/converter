import React, { useEffect } from 'react';

const Select = ({list, settings, defaultCurrency}) => {
    let currencies = list;
    let settingsRecently = settings.recently;

    useEffect(() => {
        settingsRecently.forEach((i) => {
            currencies.forEach((item, index) => {
                if (item.code === i) currencies.splice(index, 1)
            });
        });
    }, []);

    return (
        <select
            onChange={(e) => defaultCurrency(e.target.value)}
            value={settingsRecently.length === 0 ? "Select" : settings.defaultCurrency}>
            {settingsRecently?.length > 0 ?
                <>
                    <option disabled>Recently choices</option>
                    <option disabled>-------------------</option>
                    {settingsRecently.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                    <option disabled>-------------------</option>
                </>
                : <option value="Select" disabled>Select your currency</option>
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