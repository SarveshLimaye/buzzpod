import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const colors = {
  brand: {
    50: "#ecefff",
    100: "#cbceeb",
    200: "#a9aed6",
    300: "#888ec5",
    400: "#666db3",
    500: "#4d5499",
    600: "#3c4178",
    700: "#2a2f57",
    800: "#181c37",
    900: "#080819"
  }
};
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const theme = extendTheme({ colors, config })

const provider = new AuthProvider(`${process.env.REACT_APP_ARCANA_APPID}`)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProvideAuth provider={provider}>
  <React.StrictMode>
  <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>
  </ProvideAuth>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
