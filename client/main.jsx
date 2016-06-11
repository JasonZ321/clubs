import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import CreateClub from './components/clubs/create_club';
import ClubsMain from './components/clubs/clubs_main';
import { Image } from '../imports/api/image';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={ClubsMain} />
      <Route path="/create_club" component={CreateClub} />
    </Route>
  </Router>
);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
