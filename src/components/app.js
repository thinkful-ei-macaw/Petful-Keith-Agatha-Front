import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './app.css'
import Info from '../routes/info/info'
import Adopt from '../routes/adopt/adopt'

export default class App extends Component {
  render() {
    return (
      <>
      <div className='star'>
        <nav>
          <div className='container'>
            <div className='links'>
              <Link className='lank' to='/adopt'>Adopt</Link>
              <Link className='lank' to='/'>Home</Link>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path='/adopt' component={Adopt} />
          <Route exact path='/' component={Info} />
        </Switch>
      </div>
      </>
    );
  }
}
