"use client"
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from 'redux-persist/integration/react';


interface Props {
  children: React.ReactNode
}

const ReduxProvider: React.FC<Props> = ({ children }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
