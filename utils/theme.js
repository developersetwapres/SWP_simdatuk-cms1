import { createTheme } from '@mui/material/styles'

// * Palette
export const palette = {
  primary: {
    light: '#444444',
    main: '#2F2F2F',
    contrastText: '#fff'
  },
  warning: {
    light: '#FEB864',
    main: '#FE9516',
    dark: '#D47C12',
    contrastText: '#fff'
  },
  defaultBase: {
    main: '#444444',
    dark: '#2F2F2F'
  },
  secondary: {
    light: '#D9D9D9',
    main: '#D9D9D9',
    dark: '#BABABA',
    contrastText: '#878787'
  },
  success: {
    main: '#0ABD52',
    contrastText: '#fff'
  },
  danger: {
    main: '#D32F2F',
    contrastText: '#fff'
  },
  simdatukPrimary: {
    main: '#895700',
    dark: '#2F2F2F'
  },
  sidatukDraweBase: {
    main: '#394346',
    dark: '#2F2F2F'
  }
}

// * Initial State
const initialState = {
  palette: palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 12px',
          borderRadius: '6px',
          boxShadow: 'none',

          // Disabled
          '&:disabled': {
            backgroundColor: '#D9D9D9',
            padding: '14.5px'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          fontSize: '14px'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          borderRadius: '6px'
          // backgroundColor: '#fff'
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#2F2F2F'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#fff'
        }
      }
    }
  }
}

export const blackButtonStyle = {
  '&:hover': {
    backgroundColor: '#444444',
    boxShadow: 'none',
    transition: 'background-color .2s linear'
  }
}

export const successButtonStyle = {
  '&:hover': {
    backgroundColor: '#50c86c',
    boxShadow: 'none',
    color: '#fff',
    transition: 'background-color .2s linear'
  }
}

export const primaryButtonStyle = {
  '&:hover': {
    backgroundColor: '#FEA73D',
    boxShadow: 'none'
  },
  '&:active': {
    backgroundColor: '#D47C12'
  }
}

export const dangerButtonStyle = {
  '&:hover': {
    backgroundColor: '#d7564b',
    boxShadow: 'none',
    transition: 'background-color .2s linear'
  }
}

// * Create theme instance
const theme = createTheme(initialState)

export default theme
