import React from 'react';
import css from '../styles/app.module.css';

const SettingsButton = ({setShowSettings, showSettings}) => {
  return (
    <button
      className={css.btnSettings}
      title="Settings"
      onClick={() => setShowSettings(!showSettings)}>
    </button>
  );
};

export default SettingsButton;