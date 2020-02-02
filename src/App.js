import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HTMLWebcomponent from './components/html/HTMLWebcomponent';

class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={HTMLWebcomponent} />
        </Switch>
      </div>
    )
  }
}

export default App;