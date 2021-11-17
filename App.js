import { store } from "@/Store/store";
import React from "react";
import { Provider } from "react-redux";
import Router from "./src/Page/Router";

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
