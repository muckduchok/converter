import React from 'react';
import list from "../utils/listOfСurrencies.json";
import Select from "../ui/Select";

const Settings = ({settings, handler, defaultCurrency}) => {
    const currenciesList = Object.keys(list).map((key) => list[key]);

    return (
        <div className="settings">
            <div className="settings-default">
                <span>Choice main currency</span>
                <Select
                    defaultCurrency={defaultCurrency}
                    list={currenciesList}
                    settings={settings} />
            </div>
            <div className="settings-searchReg">
                <span>Search among words</span>
                <input
                    type="checkbox"
                    onChange={() => handler(!settings.regSearch)} defaultChecked={settings.regSearch}/>
            </div>
        </div>
    );
};

export default Settings;