# Tony's Pizza Palace - Professional POS System

A complete, feature-rich Point of Sale system built with React for pizza restaurants and food service businesses.

## 🍕 Features

### Core POS Functionality
- **Interactive Menu System** - Specialty pizzas, custom pizza builder, appetizers, beverages
- **Order Management** - Real-time order tracking, customer information, pricing calculations
- **Payment Processing** - Tax calculations, multiple payment methods, receipt generation
- **Customer Management** - Customer database, order history, loyalty tracking

### Kitchen Operations
- **Kitchen Display System** - Real-time order tickets, priority management, timing
- **Inventory Management** - Stock tracking, low stock alerts, reorder notifications
- **Recipe Management** - Specialty pizza recipes, ingredient tracking

### Business Management
- **Employee Management** - Clock in/out, role management, payroll tracking
- **Sales Reports** - Daily sales, payment methods, busy hour analysis
- **Configuration Panel** - Runtime settings changes, business customization

### Advanced Features
- **Multi-Role Access** - Manager authentication for sensitive operations
- **Responsive Design** - Works on tablets, phones, and desktop computers
- **Real-time Updates** - Live order status, inventory alerts
- **Professional UI** - Clean, intuitive interface designed for fast service

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser to `http://localhost:3000`
   - Default manager password: `9999`

## 📋 System Requirements

- Node.js 16+
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Tablet or desktop for optimal experience

## 🛠 Customization Guide

### Restaurant Information
Edit `src/config/restaurant.js` to customize:

```javascript
export const RESTAURANT_CONFIG = {
  info: {
    name: "YOUR RESTAURANT NAME",
    address: "YOUR ADDRESS",
    phone: "YOUR PHONE",
    // ... more settings
  }
}
```

### Menu & Pricing
Update prices and menu items in the config file:

```javascript
pricing: {
  pizza: {
    small: 9.99,   // Change base prices
    medium: 12.99,
    large: 15.99
  },
  toppings: {
    pepperoni: 1.50,  // Adjust topping prices
    // ... add your toppings
  }
}
```

### Business Settings
Configure tax rates, fees, and operational settings:

```javascript
business: {
  taxRate: 0.085,        // Your local tax rate
  deliveryFee: 3.99,     // Delivery charges
  managerPassword: 'YOUR_PASSWORD'  // CHANGE THIS!
}
```

## 🏪 Using the System

### POS Operations
1. **Taking Orders**
   - Select specialty pizzas or build custom pizzas
   - Add appetizers and beverages
   - Enter customer information
   - Complete order with payment

2. **Kitchen Management**
   - View incoming orders on kitchen display
   - Track preparation times
   - Mark orders complete

3. **Customer Service**
   - Search customer database
   - View order history
   - Manage customer information

### Manager Functions
Access with manager password for:
- Sales reports and analytics
- Employee management
- Inventory tracking
- System configuration

## 📊 Business Analytics

The system tracks:
- Daily sales totals
- Payment method breakdown
- Busy hour analysis
- Average order values
- Employee productivity
- Inventory usage

## 🔧 Technical Architecture

### Frontend Stack
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Vite** - Fast development and builds

### Key Components
- `App.jsx` - Main application logic
- `ConfigPanel.jsx` - Runtime configuration
- `useConfig.js` - Configuration management
- `restaurant.js` - Business settings

### State Management
- React hooks and reducers
- Local storage persistence
- Real-time updates

## 🔐 Security Features

- Manager authentication for sensitive operations
- Role-based access control
- Secure password handling
- Data validation and sanitization

## 📱 Mobile Compatibility

- Responsive design works on all devices
- Touch-friendly interface
- Optimized for tablet POS systems
- Mobile-first navigation

## 🎯 Perfect For

- Pizza restaurants
- Quick service restaurants
- Food trucks
- Cafes and delis
- Any food service business

## 🆘 Support & Troubleshooting

### Common Issues

**Orders not appearing in kitchen?**
- Check if kitchen display is selected
- Verify order completion

**Configuration changes not saving?**
- Use the Settings panel to save changes
- Check browser local storage permissions

**Manager functions not working?**
- Verify manager password in config
- Check authentication status

### Getting Help

1. Check the configuration file for settings
2. Review browser console for errors
3. Verify all dependencies are installed
4. Ensure you're using a supported browser

## 🔄 Updates & Maintenance

- Regularly backup your configuration
- Update menu prices seasonally
- Review sales reports for business insights
- Keep employee information current

## 📈 Growing Your Business

Use the built-in analytics to:
- Identify peak hours for staffing
- Track popular menu items
- Monitor average order values
- Analyze customer ordering patterns
- Optimize pricing strategies

## 🏗 Development

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### File Structure
```
src/
├── components/          # React components
├── config/             # Configuration files
├── hooks/              # Custom React hooks
├── App.jsx            # Main application
├── main.jsx           # React entry point
└── index.css          # Global styles
```

## 📄 License

Professional POS System for Commercial Use

---

**Ready to revolutionize your restaurant operations?** 

This system provides everything you need to run a professional food service business with modern technology and intuitive design.