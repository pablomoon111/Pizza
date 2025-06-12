// ============================================
// RESTAURANT CONFIGURATION
// ============================================
// This file contains all the settings you can customize for your restaurant
// Simply modify the values below to match your business needs

export const RESTAURANT_CONFIG = {
  // BASIC RESTAURANT INFO - Change these to match your restaurant
  info: {
    name: "Tony's Pizza Palace",           // YOUR RESTAURANT NAME HERE
    address: "123 Main Street, Lansing, MI 48906",  // YOUR ADDRESS HERE
    phone: "(517) 555-PIZZA",             // YOUR PHONE NUMBER HERE
    logo: "🍕",                          // YOUR EMOJI LOGO HERE
    email: "orders@tonyspizza.com",       // YOUR EMAIL HERE
    website: "www.tonyspizza.com"         // YOUR WEBSITE HERE
  },

  // BUSINESS SETTINGS - Adjust these for your operations
  business: {
    taxRate: 0.085,                       // YOUR TAX RATE (8.5% = 0.085)
    deliveryFee: 3.99,                    // YOUR DELIVERY FEE
    managerPassword: '9999',              // CHANGE THIS PASSWORD!
    rushOrderSurcharge: 2.00,             // EXTRA CHARGE FOR RUSH ORDERS
    loyaltyDiscount: 0.10,                // LOYALTY CUSTOMER DISCOUNT (10% = 0.10)
    tipSuggestions: [15, 18, 20, 25],     // TIP PERCENTAGE SUGGESTIONS
    maxOrderItems: 50,                    // MAX ITEMS PER ORDER
    orderTimeout: 30                      // ORDER TIMEOUT IN MINUTES
  },

  // MENU PRICING - Adjust these prices for your menu
  pricing: {
    // Base pizza prices by size
    pizza: {
      small: 9.99,                        // 10" PIZZA BASE PRICE
      medium: 12.99,                      // 12" PIZZA BASE PRICE  
      large: 15.99                        // 16" PIZZA BASE PRICE
    },
    
    // Stromboli prices
    stromboli: {
      small: 8.99,                        // SMALL STROMBOLI PRICE
      large: 11.99                        // LARGE STROMBOLI PRICE
    },
    
    // Topping prices - ADD YOUR TOPPINGS AND PRICES HERE
    toppings: {
      // Meat toppings
      pepperoni: 1.50,
      sausage: 1.50,
      ham: 1.50,
      bacon: 1.75,
      chicken: 2.00,
      
      // Vegetable toppings
      mushrooms: 1.25,
      peppers: 1.25,
      onions: 1.25,
      olives: 1.25,
      tomatoes: 1.25,
      pineapple: 1.25,
      
      // Premium toppings
      extraCheese: 1.75,
      freshMozzarella: 2.25,
      basil: 1.00
    }
  },

  // SPECIALTY PIZZA RECIPES - Define your specialty pizzas here
  specialtyPizzas: {
    margherita: {
      name: "Margherita",
      toppings: ['freshMozzarella', 'basil'],
      description: "Fresh mozzarella and basil"
    },
    pepperoni: {
      name: "Pepperoni",
      toppings: ['pepperoni'],
      description: "Classic pepperoni pizza"
    },
    supreme: {
      name: "Supreme",
      toppings: ['pepperoni', 'sausage', 'peppers', 'onions', 'mushrooms'],
      description: "The works - pepperoni, sausage, peppers, onions, mushrooms"
    },
    hawaiian: {
      name: "Hawaiian",
      toppings: ['ham', 'pineapple'],
      description: "Ham and pineapple"
    },
    meatLovers: {
      name: "Meat Lovers",
      toppings: ['pepperoni', 'sausage', 'ham', 'bacon'],
      description: "All the meats - pepperoni, sausage, ham, bacon"
    },
    veggie: {
      name: "Veggie",
      toppings: ['mushrooms', 'peppers', 'onions', 'olives', 'tomatoes'],
      description: "Fresh vegetables"
    }
  },

  // OTHER MENU ITEMS - Add your sides, drinks, etc.
  menuItems: {
    appetizers: [
      { id: 'garlic-bread', name: 'Garlic Bread', description: 'Fresh baked with garlic butter', price: 6.99 },
      { id: 'mozzarella-sticks', name: 'Mozzarella Sticks', description: '6 pieces with marinara sauce', price: 8.99 },
      { id: 'buffalo-wings', name: 'Buffalo Wings', description: '8 pieces, choice of sauce', price: 11.99 },
      { id: 'caesar-salad', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan', price: 7.99 }
    ],
    beverages: [
      { id: 'soft-drink', name: 'Soft Drink', description: 'Coke, Pepsi, Sprite, etc.', price: 2.99 },
      { id: 'bottled-water', name: 'Bottled Water', description: '16oz bottle', price: 1.99 },
      { id: 'coffee', name: 'Coffee', description: 'Fresh brewed', price: 2.49 },
      { id: 'beer', name: 'Beer', description: 'Domestic bottle', price: 4.99 }
    ]
  },

  // EMPLOYEE ROLES AND PERMISSIONS
  roles: {
    manager: {
      name: 'Manager',
      permissions: ['all'],
      hourlyRate: 18.00
    },
    cook: {
      name: 'Cook',
      permissions: ['kitchen', 'inventory'],
      hourlyRate: 15.00
    },
    driver: {
      name: 'Driver',
      permissions: ['delivery', 'pos'],
      hourlyRate: 12.00
    },
    cashier: {
      name: 'Cashier',
      permissions: ['pos', 'customers'],
      hourlyRate: 13.00
    }
  },

  // INVENTORY TRACKING - Set your inventory items and minimum levels
  inventory: {
    cheese: { minimum: 10, unit: 'lbs', cost: 4.50 },
    pepperoni: { minimum: 15, unit: 'lbs', cost: 6.25 },
    dough: { minimum: 20, unit: 'balls', cost: 0.85 },
    sauce: { minimum: 5, unit: 'containers', cost: 3.20 },
    bacon: { minimum: 5, unit: 'lbs', cost: 7.50 }
  },

  // KITCHEN STATIONS - Define your kitchen workflow
  kitchenStations: ['pizza', 'fryer', 'prep', 'oven', 'salad'],

  // DELIVERY ZONES - Define your delivery areas
  deliveryZones: {
    north: { name: 'North Zone', surcharge: 0 },
    south: { name: 'South Zone', surcharge: 0 },
    east: { name: 'East Zone', surcharge: 1.00 },
    west: { name: 'West Zone', surcharge: 1.00 }
  }
};

// ============================================
// HOW TO CUSTOMIZE THIS FILE:
// ============================================
/*
1. RESTAURANT INFO: Change name, address, phone to match your business
2. PRICING: Adjust all prices in the pricing section
3. MENU ITEMS: Add/remove items in menuItems section
4. SPECIALTY PIZZAS: Modify recipes or add new ones
5. EMPLOYEE ROLES: Adjust roles and hourly rates
6. BUSINESS SETTINGS: Change tax rate, delivery fee, etc.
7. INVENTORY: Add your inventory items and minimum levels

IMPORTANT: After making changes, restart your development server!
*/