import React from 'react';
import list from "../utils/listOfСurrencies.json";
import Select from "../ui/Select";
import css from './app.module.css';

const Settings = ({settings, handler, defaultCurrency}) => {
    const currenciesList = Object.keys(list).map((key) => list[key]);

    return (
        <div className={css.settings}>
            <div className={css.settingsDefault}>
                <span className={css.span}>Choice main currency</span>
                <Select
                    defaultCurrency={defaultCurrency}
                    list={currenciesList}
                    settings={settings} />
            </div>
            <div>
                <span className={css.span}>Search among words</span>
                <input
                    className={css.input}
                    type="checkbox"
                    onChange={() => handler(!settings.regSearch)}
                    defaultChecked={settings.regSearch}/>
            </div>
        </div>
    );
};

export default Settings;