import React, { useState, useEffect } from 'react';
import { Phone, MapPin, CreditCard, Clock, CheckCircle, AlertCircle, Truck, Users, FileText, Plus, Minus, Edit, Printer, BarChart3, Database, Package, Calendar, UserPlus, DollarSign, Building2, Wine, Settings, Search, Home, ShoppingCart, X, Check } from 'lucide-react';
import { restaurantConfig } from './config/restaurant.js';

const TonysPizzaPalace = () => {
  // Core State Management
  const [currentView, setCurrentView] = useState('pos');
  const [currentStep, setCurrentStep] = useState('menu');
  const [managerCode, setManagerCode] = useState('');
  const [isManagerAuthenticated, setIsManagerAuthenticated] = useState(false);
  
  // POS State
  const [currentOrder, setCurrentOrder] = useState([]);
  const [orderCounter, setOrderCounter] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', address: '', notes: ''
  });

  // Business State
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState(restaurantConfig.initialData.customers);
  const [employees, setEmployees] = useState(restaurantConfig.initialData.employees);
  const [inventory, setInventory] = useState(restaurantConfig.initialData.inventory);
  const [dailyStats, setDailyStats] = useState(restaurantConfig.initialData.dailyStats);
  const [drivers, setDrivers] = useState(restaurantConfig.initialData.drivers);
  const [kitchenOrders, setKitchenOrders] = useState(restaurantConfig.initialData.kitchenOrders);

  // Utility Functions
  const generateTicketNumber = () => Math.floor(Math.random() * 9000) + 1000;
  const findCustomerByPhone = (phone) => customers.find(customer => customer.phone === phone);
  
  const calculateOrderTotal = () => {
    const subtotal = currentOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * restaurantConfig.businessSettings.taxRate;
    return { subtotal, tax, total: subtotal + tax };
  };

  const calculateSpecialtyPrice = (baseType, size, toppings) => {
    const basePrice = restaurantConfig.menu.basePrices[baseType][size];
    const toppingsPrice = toppings.reduce((sum, topping) => sum + (restaurantConfig.menu.toppingPrices[topping] || 0), 0);
    return basePrice + toppingsPrice;
  };

  // Generate menu items dynamically
  const generateMenuItems = () => {
    const items = {
      specialtyPizzas: [],
      buildYourOwn: [],
      strombolis: [],
      appetizers: restaurantConfig.menu.appetizers,
      beverages: restaurantConfig.menu.beverages
    };

    // Generate specialty pizzas
    ['small', 'medium', 'large'].forEach(size => {
      Object.entries(restaurantConfig.menu.specialtyRecipes).forEach(([name, toppings]) => {
        items.specialtyPizzas.push({
          id: `${name}-${size}`,
          name: `${size.charAt(0).toUpperCase() + size.slice(1)} ${name.charAt(0).toUpperCase() + name.slice(1)} Pizza`,
          description: `${toppings.join(', ')} on ${size} (${size === 'small' ? '10"' : size === 'medium' ? '12"' : '16"'})`,
          price: calculateSpecialtyPrice('pizza', size, toppings),
          category: 'pizza',
          size: size,
          toppings: toppings
        });
      });
    });

    // Generate build your own pizzas
    ['small', 'medium', 'large'].forEach(size => {
      items.buildYourOwn.push({
        id: `byo-${size}`,
        name: `${size.charAt(0).toUpperCase() + size.slice(1)} Build Your Own Pizza`,
        description: `Choose your toppings (${size === 'small' ? '10"' : size === 'medium' ? '12"' : '16"'})`,
        price: restaurantConfig.menu.basePrices.pizza[size],
        category: 'pizza',
        size: size,
        customizable: true
      });
    });

    // Generate strombolis
    ['small', 'large'].forEach(size => {
      ['pepperoni', 'supreme'].forEach(type => {
        items.strombolis.push({
          id: `stromboli-${type}-${size}`,
          name: `${size.charAt(0).toUpperCase() + size.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Stromboli`,
          description: `${restaurantConfig.menu.specialtyRecipes[type].join(', ')} in ${size} stromboli`,
          price: calculateSpecialtyPrice('stromboli', size, restaurantConfig.menu.specialtyRecipes[type]),
          category: 'stromboli'
        });
      });
    });

    return items;
  };

  const menuItems = generateMenuItems();

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-gradient-to-r from-red-800 via-red-900 to-black text-white p-4 shadow-2xl">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <span className="text-4xl animate-pulse">{restaurantConfig.restaurantInfo.logo}</span>
          <div>
            <h1 className="text-2xl font-bold text-yellow-300">{restaurantConfig.restaurantInfo.name}</h1>
            <span className="text-sm text-gray-300">({restaurantConfig.restaurantInfo.phone})</span>
          </div>
        </div>
        <div className="flex space-x-2">
          {[
            { key: 'pos', label: 'POS', icon: ShoppingCart },
            { key: 'kitchen', label: 'Kitchen', icon: Clock },
            { key: 'drivers', label: 'Drivers', icon: Truck },
            { key: 'bartender', label: 'Bar', icon: Wine },
            { key: 'records', label: 'Records', icon: Database },
            { key: 'inventory', label: 'Inventory', icon: Package },
            { key: 'manager', label: 'Manager', icon: Settings }
          ].map(item => (
            <button 
              key={item.key}
              onClick={() => setCurrentView(item.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center transform hover:scale-105 ${
                currentView === item.key 
                  ? 'bg-yellow-500 text-black shadow-lg' 
                  : 'bg-black/50 hover:bg-red-700 border border-red-600'
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4 mr-2" />}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  // Enhanced POS System
  const POSSystem = () => {
    const [selectedCategory, setSelectedCategory] = useState('specialtyPizzas');
    const [customToppings, setCustomToppings] = useState([]);
    const [showCustomization, setShowCustomization] = useState(false);
    const [currentCustomItem, setCurrentCustomItem] = useState(null);

    const addToOrder = (item) => {
      const existingItem = currentOrder.find(orderItem => 
        orderItem.id === item.id && JSON.stringify(orderItem.customToppings || []) === JSON.stringify(customToppings)
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        setCurrentOrder(prev => [...prev, {
          ...item,
          quantity: 1,
          orderId: orderCounter,
          customToppings: item.customizable ? [...customToppings] : [],
          finalPrice: item.customizable ? 
            item.price + customToppings.reduce((sum, topping) => sum + restaurantConfig.menu.toppingPrices[topping], 0) :
            item.price
        }]);
        setOrderCounter(prev => prev + 1);
      }
      setCustomToppings([]);
      setShowCustomization(false);
    };

    const updateQuantity = (orderId, change) => {
      setCurrentOrder(prev => prev.map(item => 
        item.orderId === orderId 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0));
    };

    const removeFromOrder = (orderId) => {
      setCurrentOrder(prev => prev.filter(item => item.orderId !== orderId));
    };

    const completeOrder = () => {
      if (currentOrder.length === 0) {
        alert('No items in order!');
        return;
      }
      
      if (!customerInfo.name || !customerInfo.phone) {
        alert('Please enter customer information!');
        return;
      }

      const orderData = {
        id: Date.now(),
        ticketNumber: generateTicketNumber().toString(),
        customerInfo,
        items: currentOrder,
        ...calculateOrderTotal(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      setOrders(prev => [...prev, orderData]);
      
      // Add to kitchen orders
      setKitchenOrders(prev => [...prev, {
        id: orderData.id,
        ticketNumber: orderData.ticketNumber,
        items: orderData.items.map(item => `${item.quantity}x ${item.name}`),
        station: 'pizza',
        priority: 'normal',
        timeOrdered: new Date().toLocaleTimeString().slice(0, 5),
        estimatedTime: '25 min'
      }]);

      // Update customer records
      const existingCustomer = findCustomerByPhone(customerInfo.phone);
      if (existingCustomer) {
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pos-card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Custom Pizza Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Size</h4>
                <div className="space-y-2">
                  {['small', 'medium', 'large'].map(size => (
                    <label key={size} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="size"
                        value={size}
                        checked={customPizza.size === size}
                        onChange={(e) => setCustomPizza(prev => ({ ...prev, size: e.target.value }))}
                        className="text-red-600"
                      />
                      <span className="capitalize">{size} - ${config.pricing.pizza[size]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Toppings</h4>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {Object.entries(config.pricing.toppings).map(([topping, price]) => (
                    <label key={topping} className="flex items-center space-x-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={customPizza.toppings.includes(topping)}
                        onChange={() => toggleTopping(topping)}
                        className="text-red-600"
                      />
                      <span className="capitalize">{topping.replace(/([A-Z])/g, ' $1')} (+${price})</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={addCustomPizza}
                  className="pos-button pos-button-primary w-full mt-4"
                >
                  Add Custom Pizza ${(config.pricing.pizza[customPizza.size] + customPizza.toppings.reduce((sum, topping) => sum + (config.pricing.toppings[topping] || 0), 0)).toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          <div className="pos-card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Other Items</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Appetizers</h4>
                <div className="space-y-2">
                  {config.menuItems.appetizers.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <button
                        onClick={() => addToOrder(item, 'appetizer')}
                        className="pos-button pos-button-primary"
                      >
                        ${item.price}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Beverages</h4>
                <div className="space-y-2">
                  {config.menuItems.beverages.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <button
                        onClick={() => addToOrder(item, 'beverage')}
                        className="pos-button pos-button-primary"
                      >
                        ${item.price}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="pos-card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Current Order</h3>
            {state.currentOrder.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No items in order</p>
            ) : (
              <div className="space-y-3">
                {state.currentOrder.map(item => (
                  <div key={item.id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      {item.description && <div className="text-sm text-gray-600">{item.description}</div>}
                      {item.toppings && item.toppings.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Toppings: {item.toppings.map(t => t.replace(/([A-Z])/g, ' $1')).join(', ')}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromOrder(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {state.currentOrder.length > 0 && (
              <div className="mt-6 pt-4 border-t space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({(config.business.taxRate * 100).toFixed(1)}%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pos-card">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Info</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name"
                value={state.customerInfo.name}
                onChange={(e) => dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { name: e.target.value } })}
                className="pos-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={state.customerInfo.phone}
                onChange={(e) => dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { phone: e.target.value } })}
                className="pos-input"
              />
              <textarea
                placeholder="Address"
                value={state.customerInfo.address}
                onChange={(e) => dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { address: e.target.value } })}
                className="pos-input"
                rows="2"
              />
              <textarea
                placeholder="Special Instructions"
                value={state.customerInfo.notes}
                onChange={(e) => dispatch({ type: 'UPDATE_CUSTOMER_INFO', payload: { notes: e.target.value } })}
                className="pos-input"
                rows="2"
              />
              <button
                onClick={completeOrder}
                disabled={state.currentOrder.length === 0}
                className="pos-button pos-button-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Order ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Kitchen Display Component
  const KitchenDisplay = () => (
    <div className="space-y-6">
      <div className="pos-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Kitchen Display</h2>
          <div className="text-sm text-gray-600">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.kitchenOrders.map(order => (
            <div key={order.id} className={`pos-card ${order.priority === 'rush' ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex space-x-2">
                  <span className="font-bold text-lg">#{order.ticketNumber}</span>
                  {order.priority === 'rush' && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      RUSH
                    </span>
                  )}
                </div>
                <div className="text-right text-sm text-gray-600">
                  <div>Ordered: {order.timeOrdered}</div>
                  <div>Est: {order.estimatedTime}</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="font-medium">{item}</div>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {order.station}
                </span>
                <button className="pos-button pos-button-primary">
                  Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Customer Management Component
  const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddCustomer, setShowAddCustomer] = useState(false);

    const filteredCustomers = state.customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );

    return (
      <div className="space-y-6">
        <div className="pos-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
            <button
              onClick={() => setShowAddCustomer(true)}
              className="pos-button pos-button-primary flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pos-input pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map(customer => (
              <div key={customer.id} className="pos-card border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{customer.name}</h3>
                    <p className="text-gray-600">{customer.phone}</p>
                  </div>
                  {customer.isRegular && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                      REGULAR
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Addresses:</span>
                    {customer.addresses.map((addr, idx) => (
                      <div key={idx} className="text-gray-600 ml-2">{addr}</div>
                    ))}
                  </div>
                  <div>
                    <span className="font-medium">Total Orders:</span>
                    <span className="ml-2">{customer.orders.length}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="pos-button pos-button-secondary flex-1">
                    Edit
                  </button>
                  <button className="pos-button pos-button-primary flex-1">
                    New Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Reports Component
  const ReportsComponent = () => (
    <div className="space-y-6">
      <div className="pos-card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Sales Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">${state.dailyStats.totalSales}</div>
                <div className="text-sm text-gray-600">Total Sales</div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{state.dailyStats.totalOrders}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-600">${state.dailyStats.averageOrderValue}</div>
                <div className="text-sm text-gray-600">Avg Order</div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-600">${state.dailyStats.totalTips}</div>
                <div className="text-sm text-gray-600">Total Tips</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="pos-card border">
            <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Cash Sales:</span>
                <span className="font-semibold">${state.dailyStats.cashSales}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Card Sales:</span>
                <span className="font-semibold">${state.dailyStats.cardSales}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-bold">
                  <span>Register Amount:</span>
                  <span>${state.dailyStats.registerAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pos-card border">
            <h3 className="text-lg font-bold mb-4">Busy Hours</h3>
            <div className="space-y-2">
              {Object.entries(state.dailyStats.busyHours).map(([hour, orders]) => (
                <div key={hour} className="flex justify-between items-center">
                  <span>{hour}:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${(orders / 15) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{orders} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Employee Management Component
  const EmployeeManagement = () => (
    <div className="space-y-6">
      <div className="pos-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>
          <button className="pos-button pos-button-primary flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Add Employee</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {state.employees.map(employee => (
            <div key={employee.id} className="pos-card border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{employee.name}</h3>
                  <p className="text-gray-600 capitalize">{employee.role}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {employee.clockedIn && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      CLOCKED IN
                    </span>
                  )}
                  {!employee.active && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                      INACTIVE
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div><span className="font-medium">Phone:</span> {employee.phone}</div>
                <div><span className="font-medium">Hourly Rate:</span> ${employee.hourlyRate}/hr</div>
                <div><span className="font-medium">Hours Today:</span> {employee.hoursWorked}</div>
                {employee.deliveryTips && (
                  <div><span className="font-medium">Tips Today:</span> ${employee.deliveryTips}</div>
                )}
                {employee.clockedIn && employee.clockInTime && (
                  <div><span className="font-medium">Clocked In:</span> {new Date(employee.clockInTime).toLocaleTimeString()}</div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <button className="pos-button pos-button-secondary flex-1">
                  Edit
                </button>
                <button className={`pos-button flex-1 ${employee.clockedIn ? 'bg-red-600 text-white hover:bg-red-700' : 'pos-button-primary'}`}>
                  {employee.clockedIn ? 'Clock Out' : 'Clock In'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Inventory Management Component
  const InventoryManagement = () => (
    <div className="space-y-6">
      <div className="pos-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Inventory Management</h2>
          <button className="pos-button pos-button-primary flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(state.inventory).map(([item, details]) => {
            const isLow = details.current <= details.minimum;
            const isOut = details.current === 0;
            
            return (
              <div key={item} className={`pos-card border ${isOut ? 'border-red-500 bg-red-50' : isLow ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg capitalize">{item}</h3>
                    <p className="text-gray-600">Cost: ${details.cost} per {details.unit}</p>
                  </div>
                  {isOut && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      OUT OF STOCK
                    </span>
                  )}
                  {isLow && !isOut && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      LOW STOCK
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span>Current Stock:</span>
                    <span className={`font-bold ${isOut ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-green-600'}`}>
                      {details.current} {details.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minimum Level:</span>
                    <span>{details.minimum} {details.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isOut ? 'bg-red-500' : isLow ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min((details.current / (details.minimum * 2)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="pos-button pos-button-secondary flex-1">
                    Update
                  </button>
                  <button className="pos-button pos-button-primary flex-1">
                    Reorder
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="gradient-bg text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{config.info.logo}</span>
          <div>
            <h1 className="text-xl font-bold">{config.info.name}</h1>
            <p className="text-sm opacity-90">{config.info.address}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4" />
            <span>{config.info.phone}</span>
          </div>
          <div className="text-sm">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mt-4 flex-wrap">
        {[
          { key: 'pos', label: 'POS System', icon: Home },
          { key: 'kitchen', label: 'Kitchen', icon: Clock },
          { key: 'customers', label: 'Customers', icon: Users },
          { key: 'reports', label: 'Reports', icon: BarChart3 },
          { key: 'employees', label: 'Employees', icon: Users },
          { key: 'inventory', label: 'Inventory', icon: Package }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => navigate(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              state.currentView === key 
                ? 'bg-white text-red-600 font-semibold' 
                : 'bg-red-700 hover:bg-red-600 text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
        
        <button
          onClick={() => setShowConfigPanel(true)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all ml-auto"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </nav>
  );

  // Render current view
  const renderCurrentView = () => {
    switch (state.currentView) {
      case 'pos':
        return <POSInterface />;
      case 'kitchen':
        return <KitchenDisplay />;
      case 'customers':
        return <CustomerManagement />;
      case 'reports':
        return <ReportsComponent />;
      case 'employees':
        return <EmployeeManagement />;
      case 'inventory':
        return <InventoryManagement />;
      default:
        return <POSInterface />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>
      
      {showConfigPanel && (
        <ConfigPanel
          config={config}
          updateConfig={updateConfig}
          saveConfig={saveConfig}
          resetConfig={resetConfig}
          onClose={() => setShowConfigPanel(false)}
        />
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="text-center">
          <p>&copy; 2025 {config.info.name} - Professional POS System</p>
          <p className="text-sm text-gray-400 mt-1">
            {config.info.email} • {config.info.website}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TonysPizzaPalace;