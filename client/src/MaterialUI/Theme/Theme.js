import { createMuiTheme } from '../Import/Import';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Nunito Sans', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#5a3796',
    },
    secondary: {
      main: '#03DAC6',
    },
    error: {
      main: '#B00020',
    },
  },
});
export { theme };
