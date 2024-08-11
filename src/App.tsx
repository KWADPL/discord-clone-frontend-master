import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./Routes";
import { persistor } from "./Store/index";

function App() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  );
}
export default App;
