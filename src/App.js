import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import React from 'react';
import { data } from './data';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home data={data}/>
        </Route>
        <Route path="/detail/:id">
          <Detail data={data}/>
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
