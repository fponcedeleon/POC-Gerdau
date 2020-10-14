import React from "react";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/home';
import Machine from './screens/newMachine';
import List from './screens/list';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path='/' exact component={Home} />
      <Route path='/new' exact component={Machine} />
      <Route path='/list' exact component={List} />
    </BrowserRouter>
  );
}
