import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import CreateClub from './components/clubs/create_club';
import ClubMain from './components/clubs/club_main';
import UserMain from './components/users/user_main';
import LoginRegisterPage from './components/login/login_register_page';
import { Images } from '../imports/api/image';
import { Clubs } from '../imports/api/clubs';
import '../imports/startup/accounts-config.js';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      <Route path="/create_club" component={CreateClub} />
      <Route path="/login_register" component={LoginRegisterPage} />
      <Route path="/club_main" component={ClubMain} />
      <Route path="/user_main" component={UserMain} />
    </Route>
  </Router>
);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
