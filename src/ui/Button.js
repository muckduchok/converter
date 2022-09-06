import React from 'react';

const SettingsButton = ({setShowSettings, showSettings}) => {
  return (
    <button
      title="Settings"
      onClick={() => setShowSettings(!showSettings)}
      className="btn-settings">
    </button>
  );
};

export default SettingsButton;