import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ItemsPage from '../containers/ItemsPage'
import ItemsNew from '../containers/ItemsNew'
import ItemsShow from '../containers/ItemsShow'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../App.css';

const App = (props) =>
    <Router>
      <div className="App">
        <Header/>
          <Switch>
            <Route exact path="/" component={ItemsPage}/>
            <Route exact path="/items" component={ItemsPage}/>
            <Route exact path="/items/new" component={ItemsNew}/>
            <Route exact path="/items/:itemId" component={ItemsShow}/>
          </Switch>
        <Footer/>
      </div>
    </Router>;

export default App;
