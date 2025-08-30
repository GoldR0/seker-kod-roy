/**
 * Theme constants for consistent UI design across the application
 */

export const CUSTOM_COLORS = {
  primary: 'rgb(179, 209, 53)',
  primaryDark: 'rgb(159, 189, 33)',
  primaryLight: 'rgb(199, 229, 73)',
  textOnPrimary: 'white',
  background: '#f5f5f5',
  cardBackground: 'white',
  border: 'rgba(0, 0, 0, 0.12)',
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3'
} as const;

export const TYPOGRAPHY = {
  h1: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem'
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem'
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.25rem'
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43
  }
} as const;

export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem'
} as const;

export const BORDER_RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px'
} as const;

export const SHADOWS = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  md: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  lg: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
} as const;

export const BUTTON_STYLES = {
  primary: {
    backgroundColor: 'rgb(179, 209, 53)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(159, 189, 33)'
    },
    borderRadius: '8px',
    padding: '8px 24px',
    fontWeight: 'bold',
    textTransform: 'none' as const,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'rgb(179, 209, 53)',
    border: '2px solid rgb(179, 209, 53)',
    '&:hover': {
      backgroundColor: 'rgb(199, 229, 73)',
      color: 'white'
    },
    borderRadius: '8px',
    padding: '8px 24px',
    fontWeight: 'bold',
    textTransform: 'none' as const
  },
  danger: {
    backgroundColor: '#f44336',
    color: 'white',
    '&:hover': {
      backgroundColor: '#d32f2f'
    },
    borderRadius: '8px',
    padding: '8px 24px',
    fontWeight: 'bold',
    textTransform: 'none' as const
  }
} as const;

export const CARD_STYLES = {
  default: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    padding: '24px',
    marginBottom: '24px'
  },
  header: {
    backgroundColor: 'rgb(179, 209, 53)',
    color: 'white',
    borderRadius: '12px 12px 0 0',
    padding: '16px',
    margin: '-24px -24px 24px -24px'
  }
} as const;

export const FORM_STYLES = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    padding: '32px'
  },
  field: {
    marginBottom: '16px',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(179, 209, 53)'
      }
    }
  },
  required: {
    '& .MuiInputLabel-root::after': {
      content: '" *"',
      color: '#f44336'
    }
  }
} as const;

export const TABLE_STYLES = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: 'rgb(179, 209, 53)',
    color: 'white',
    padding: '16px',
    fontWeight: 'bold'
  },
  cell: {
    padding: '16px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  }
} as const;
