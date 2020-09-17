import React, { Component } from 'react';
import './styles/app.css';
import Main from './components/Main';
import Category from './components/Category';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Score from './components/Score';
import Comment from './components/Comment';
import NotFound from './components/NotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/signUp" component={SignUp} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/category" component={Category} exact />
        <Route path="/category/:id" component={Quiz} exact />
        <Route path="/score" component={Score} exact />
        <Route path="/comment" component={Comment} exact />
        <Route path="/*" component={NotFound} />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
