import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import ComponentTester from './containers/ComponentTester'
import Home from './containers/Home'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Home />
        {/* <Switch>
          <Route path='/' component={Home}></Route>
          <Route path='/test' component={ComponentTester} />
        </Switch> */}
      </React.Fragment>
    );
  }
}

export default App;
