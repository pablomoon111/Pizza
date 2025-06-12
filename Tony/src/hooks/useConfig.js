import { useState, useEffect } from 'react';
import { RESTAURANT_CONFIG } from '../config/restaurant.js';

export const useConfig = () => {
  const [config, setConfig] = useState(RESTAURANT_CONFIG);

  // Function to update configuration at runtime
  const updateConfig = (path, value) => {
    setConfig(prevConfig => {
      const newConfig = { ...prevConfig };
      const keys = path.split('.');
      let current = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  // Save config to localStorage for persistence
  const saveConfig = () => {
    localStorage.setItem('restaurant_config', JSON.stringify(config));
  };

  // Load config from localStorage
  const loadConfig = () => {
    const saved = localStorage.getItem('restaurant_config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  };

  // Reset to default configuration
  const resetConfig = () => {
    setConfig(RESTAURANT_CONFIG);
    localStorage.removeItem('restaurant_config');
  };

  useEffect(() => {
    loadConfig();
  }, []);

  return {
    config,
    updateConfig,
    saveConfig,
    loadConfig,
    resetConfig
  };
};