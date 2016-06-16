import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ClubMain from './components/clubs/club_main';
import UserMain from './components/users/user_main';
import UserApp from './components/users/user_app';
import UserNearbyIndexContainer from './components/users/nearby/nearby_index_container';
import UserMyclubIndexContainer from './components/users/myclub/myclub_index_container';
import UserMyactivityIndexContainer from './components/users/myactivity/myactivity_index_container';
import LoginRegisterPage from './components/login/login_register_page';
import ActivityIndexContainer from './components/clubs/activity/activity_index_container';
import ClubActivityIndexContainer from './components/clubs/activity/activity_index_container';
import ClubManagement from './components/clubs/club_management_page';
import ClubPostIndex from './components/clubs/club_post_index';
import ClubApp from './components/clubs/club_app';
import { Images } from '../imports/api/image';
import { Clubs } from '../imports/api/clubs';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={App} />
      <Route path="/login_register" component={LoginRegisterPage} />
      <Route path="/club/:clubId" component={ClubApp} >
        <IndexRoute component={ClubMain} />
        <Route path='/club/:clubId/activity' component={ClubActivityIndexContainer} />
        <Route path='/club/:clubId/post' component={ClubPostIndex} />
        <Route path='/club/:clubId/management' component={ClubManagement} />
      </Route>
      <Route path="/user/:userId" component={UserApp} >
        <IndexRoute component={UserMain} />
        <Route path='/user/:userId/nearby' component={UserNearbyIndexContainer} />
        <Route path='/user/:userId/myclub' component={UserMyclubIndexContainer} />
        <Route path='/user/:userId/myactivity' component={UserMyactivityIndexContainer} />
      </Route>
    </Route>
  </Router>
);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
