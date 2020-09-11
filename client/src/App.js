import React, { Component } from 'react';
import './styles/app.css';
import Main from './components/Main';
import Category from './components/Category';
import Quiz from './components/Quiz';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/category" component={Category} exact />
        <Route path="/category/:id" component={Quiz} exact />
        {/* <Route path="/*" component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
