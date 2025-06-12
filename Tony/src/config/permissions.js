// ============================================
// PERMISSIONS & ROLES CONFIGURATION
// ============================================
// Define what each role can access in the system

export const USER_ROLES = {
  MANAGER: 'manager',
  COOK: 'cook',
  CASHIER: 'cashier',
  DRIVER: 'driver',
  BARTENDER: 'bartender'
};

export const PERMISSIONS = {
  // POS System permissions
  POS_ACCESS: 'pos_access',
  POS_VOID_ORDER: 'pos_void_order',
  POS_APPLY_DISCOUNT: 'pos_apply_discount',
  POS_REFUND: 'pos_refund',
      
  // Kitchen permissions
  KITCHEN_ACCESS: 'kitchen_access',
  KITCHEN_MODIFY_ORDER: 'kitchen_modify_order',
  KITCHEN_MARK_COMPLETE: 'kitchen_mark_complete',
      
  // Inventory permissions
  INVENTORY_VIEW: 'inventory_view',
  INVENTORY_MODIFY: 'inventory_modify',
  INVENTORY_REPORTS: 'inventory_reports',
      
  // Employee permissions
  EMPLOYEE_VIEW: 'employee_view',
  EMPLOYEE_MODIFY: 'employee_modify',
  EMPLOYEE_SCHEDULE: 'employee_schedule',
  EMPLOYEE_PAYROLL: 'employee_payroll',
      
  // Reports and analytics
  REPORTS_DAILY: 'reports_daily',
  REPORTS_FINANCIAL: 'reports_financial',
  REPORTS_EXPORT: 'reports_export',
      
  // System administration
  SYSTEM_SETTINGS: 'system_settings',
  SYSTEM_BACKUP: 'system_backup',
  USER_MANAGEMENT: 'user_management'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.MANAGER]: [
    // Managers have access to everything
    ...Object.values(PERMISSIONS)
  ],
      
  [USER_ROLES.CASHIER]: [
    PERMISSIONS.POS_ACCESS,
    PERMISSIONS.POS_APPLY_DISCOUNT,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.EMPLOYEE_VIEW
  ],
      
  [USER_ROLES.COOK]: [
    PERMISSIONS.KITCHEN_ACCESS,
    PERMISSIONS.KITCHEN_MODIFY_ORDER,
    PERMISSIONS.KITCHEN_MARK_COMPLETE,
    PERMISSIONS.INVENTORY_VIEW
  ],
      
  [USER_ROLES.DRIVER]: [
    PERMISSIONS.POS_ACCESS, // Limited access for order pickup
    PERMISSIONS.REPORTS_DAILY // For tip tracking
  ],
      
  [USER_ROLES.BARTENDER]: [
    PERMISSIONS.POS_ACCESS,
    PERMISSIONS.INVENTORY_VIEW
  ]
};

// Check if user has permission
export const hasPermission = (userRole, permission) => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};