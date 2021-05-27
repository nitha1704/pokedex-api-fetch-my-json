import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// CSS
import "./css/style.css";
import "./css/mobile-responsive.css";
import "./css/ios-webkit-style.css";

// Plugins
import "./plugins/bootstrap/bootstrap.min.css";

// Pages
import Home from './pages/Home';
import PokemonInfo from './component/PokemonInfo';
import ErrorPage from './pages/ErrorPage';

const App = () => {

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            // Limit Pokemon Number 1-251
            // exact
            // path="/pokemon/:id([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[01])"
            // Limit Pokemon Number 1-898
            exact
            path="/pokemon/:id([1-9]|[1-9][0-9]|[1-7][0-9]{2}|8[0-8][0-9]|89[0-8])"
            component={PokemonInfo}
          />
          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App
