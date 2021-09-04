import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'; // index.js까지 안써줘도 자동으로 인식함.
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './index.css';

// set default Typography font of Material UI
const theme = createTheme({
  typography: {
    fontFamily: ['Spoqa Han Sans', 'Roboto', 'sans-serif'].join(','),
  },
});

// 그냥 store는 객체밖에 못받기 때문에 Promise와 Function도 받기 위해 미들웨어를 두 개 추가
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
const destination = document.getElementById('root');

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  destination
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
