// ============================================
// VISUAL THEME CONFIGURATION
// ============================================
// Customize the appearance of your POS system

export const THEME_CONFIG = {
  // Primary brand colors - Change these to match your restaurant's branding
  colors: {
    primary: {
      50: '#fef2f2',   // Very light red
      100: '#fee2e2',  // Light red
      200: '#fecaca',  // Lighter red
      300: '#fca5a5',  // Light red
      400: '#f87171',  // Medium light red
      500: '#ef4444',  // Base red
      600: '#dc2626',  // Medium red
      700: '#b91c1c',  // Dark red
      800: '#991b1b',  // Darker red
      900: '#7f1d1d'   // Darkest red
    },
        
    secondary: {
      50: '#fffbeb',   // Very light yellow
      100: '#fef3c7',  // Light yellow
      200: '#fde68a',  // Lighter yellow
      300: '#fcd34d',  // Light yellow
      400: '#fbbf24',  // Medium light yellow
      500: '#f59e0b',  // Base yellow
      600: '#d97706',  // Medium yellow
      700: '#b45309',  // Dark yellow
      800: '#92400e',  // Darker yellow
      900: '#78350f'   // Darkest yellow
    },
        
    success: {
      500: '#10b981',  // Green for success states
      600: '#059669',
      700: '#047857'
    },
        
    warning: {
      500: '#f59e0b',  // Orange for warnings
      600: '#d97706',
      700: '#b45309'
    },
        
    error: {
      500: '#ef4444',  // Red for errors
      600: '#dc2626',
      700: '#b91c1c'
    }
  },
      
  // Typography settings
  fonts: {
    primary: 'system-ui, -apple-system, sans-serif', // Main font
    mono: 'ui-monospace, monospace' // For numbers/receipts
  },
      
  // Component styling
  components: {
    card: {
      borderRadius: '16px',     // Card corner roundness
      shadow: 'shadow-2xl',     // Card shadow intensity
      padding: '24px'           // Card internal padding
    },
        
    button: {
      borderRadius: '8px',      // Button corner roundness
      padding: '12px 24px',     // Button padding
      fontWeight: '600'         // Button text weight
    },
        
    input: {
      borderRadius: '8px',      // Input field roundness
      borderWidth: '2px',       // Input border thickness
      padding: '12px'           // Input internal padding
    }
  },
      
  // Animation settings
  animations: {
    transition: 'all 0.3s ease', // Default transition
    hover: 'transform 0.2s ease', // Hover effects
    scale: 'scale(1.05)'          // Hover scale amount
  }
};

// Navigation theme
export const NAVIGATION_THEME = {
  background: 'bg-gradient-to-r from-red-800 via-red-900 to-black',
  textColor: 'text-white',
  activeButton: 'bg-yellow-500 text-black',
  inactiveButton: 'bg-black/50 hover:bg-red-700 border border-red-600'
};

// POS specific theming
export const POS_THEME = {
  menuSection: {
    background: 'bg-white',
    border: 'border-4 border-red-500',
    borderRadius: 'rounded-2xl'
  },
      
  orderSection: {
    background: 'bg-white',
    border: 'border-4 border-green-500',
    borderRadius: 'rounded-2xl'
  },
      
  menuItem: {
    background: 'bg-gradient-to-br from-red-50 to-yellow-50',
    border: 'border-2 border-red-200',
    hover: 'hover:shadow-xl hover:scale-105'
  }
};