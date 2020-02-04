import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HTMLWebcomponent from './components/html/HTMLWebcomponent';
import ResultComponent from './components/result/ResultComponent';
import PolymerWebComponent from './components/polymer/PolymerWebComponent';

class App extends React.Component {
  render () {
    return (
      <div>
        <Switch>
            <Route exact path="/" component={HTMLWebcomponent} />
            <Route exact path="/poly" component={PolymerWebComponent} />
            <Route exact path="/result" component={ResultComponent} />
        </Switch>
      </div>
    )
  }
}

export default App;