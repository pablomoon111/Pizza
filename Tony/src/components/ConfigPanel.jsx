import React, { useState } from 'react';
import { Settings, Save, RotateCcw, X, DollarSign, Percent, Phone, MapPin, User } from 'lucide-react';

const ConfigPanel = ({ config, updateConfig, saveConfig, resetConfig, onClose }) => {
  const [activeTab, setActiveTab] = useState('restaurant');

  const handleInputChange = (path, value, type = 'text') => {
    let processedValue = value;
    
    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
    } else if (type === 'percentage') {
      processedValue = parseFloat(value) / 100 || 0;
    }
    
    updateConfig(path, processedValue);
  };

  const ConfigSection = ({ title, children }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
      {children}
    </div>
  );

  const InputField = ({ label, path, type = 'text', value, placeholder, prefix, suffix }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-3 text-gray-500">{prefix}</span>}
        <input
          type={type === 'percentage' ? 'number' : type}
          value={type === 'percentage' ? (value * 100) : value}
          onChange={(e) => handleInputChange(path, e.target.value, type)}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
            prefix ? 'pl-8' : ''
          } ${suffix ? 'pr-8' : ''}`}
          placeholder={placeholder}
          step={type === 'number' || type === 'percentage' ? '0.01' : undefined}
        />
        {suffix && <span className="absolute right-3 top-3 text-gray-500">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-50 rounded-2xl max-w-4xl w-full mx-4 max-h-90vh overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6" />
            <h2 className="text-xl font-bold">Restaurant Configuration</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b bg-white">
          <div className="flex">
            {[
              { key: 'restaurant', label: 'Restaurant Info', icon: MapPin },
              { key: 'pricing', label: 'Pricing', icon: DollarSign },
              { key: 'business', label: 'Business Settings', icon: Percent },
              { key: 'employees', label: 'Employee Roles', icon: User }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'border-b-2 border-red-500 text-red-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'restaurant' && (
            <div className="space-y-6">
              <ConfigSection title="Restaurant Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Restaurant Name"
                    path="info.name"
                    value={config.info.name}
                    placeholder="Enter restaurant name"
                  />
                  <InputField
                    label="Phone Number"
                    path="info.phone"
                    value={config.info.phone}
                    placeholder="(555) 123-4567"
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Address"
                      path="info.address"
                      value={config.info.address}
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                  <InputField
                    label="Email"
                    path="info.email"
                    type="email"
                    value={config.info.email}
                    placeholder="orders@restaurant.com"
                  />
                  <InputField
                    label="Website"
                    path="info.website"
                    value={config.info.website}
                    placeholder="www.restaurant.com"
                  />
                </div>
              </ConfigSection>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <ConfigSection title="Pizza Base Prices">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="Small Pizza (10\")"
                    path="pricing.pizza.small"
                    type="number"
                    value={config.pricing.pizza.small}
                    prefix="$"
                  />
                  <InputField
                    label="Medium Pizza (12\")"
                    path="pricing.pizza.medium"
                    type="number"
                    value={config.pricing.pizza.medium}
                    prefix="$"
                  />
                  <InputField
                    label="Large Pizza (16\")"
                    path="pricing.pizza.large"
                    type="number"
                    value={config.pricing.pizza.large}
                    prefix="$"
                  />
                </div>
              </ConfigSection>

              <ConfigSection title="Common Topping Prices">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(config.pricing.toppings).slice(0, 8).map(([topping, price]) => (
                    <InputField
                      key={topping}
                      label={topping.charAt(0).toUpperCase() + topping.slice(1)}
                      path={`pricing.toppings.${topping}`}
                      type="number"
                      value={price}
                      prefix="$"
                    />
                  ))}
                </div>
              </ConfigSection>
            </div>
          )}

          {activeTab === 'business' && (
            <div className="space-y-6">
              <ConfigSection title="Tax and Fees">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Tax Rate"
                    path="business.taxRate"
                    type="percentage"
                    value={config.business.taxRate}
                    suffix="%"
                  />
                  <InputField
                    label="Delivery Fee"
                    path="business.deliveryFee"
                    type="number"
                    value={config.business.deliveryFee}
                    prefix="$"
                  />
                  <InputField
                    label="Rush Order Surcharge"
                    path="business.rushOrderSurcharge"
                    type="number"
                    value={config.business.rushOrderSurcharge}
                    prefix="$"
                  />
                  <InputField
                    label="Loyalty Discount"
                    path="business.loyaltyDiscount"
                    type="percentage"
                    value={config.business.loyaltyDiscount}
                    suffix="%"
                  />
                </div>
              </ConfigSection>

              <ConfigSection title="Security">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Manager Password"
                    path="business.managerPassword"
                    type="password"
                    value={config.business.managerPassword}
                    placeholder="Enter manager password"
                  />
                </div>
              </ConfigSection>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="space-y-6">
              <ConfigSection title="Employee Roles & Rates">
                <div className="space-y-4">
                  {Object.entries(config.roles).map(([role, details]) => (
                    <div key={role} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                      <InputField
                        label="Role Name"
                        path={`roles.${role}.name`}
                        value={details.name}
                      />
                      <InputField
                        label="Hourly Rate"
                        path={`roles.${role}.hourlyRate`}
                        type="number"
                        value={details.hourlyRate}
                        prefix="$"
                      />
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                        <div className="text-sm text-gray-600 p-2 bg-white rounded border">
                          {Array.isArray(details.permissions) ? details.permissions.join(', ') : details.permissions}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ConfigSection>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t p-6 flex justify-between">
          <button
            onClick={resetConfig}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                saveConfig();
                onClose();
              }}
              className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;