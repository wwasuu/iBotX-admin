import React from "react";
import { Switch, Route } from "react-router-dom";
import { Main } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  );
}

export default App;
