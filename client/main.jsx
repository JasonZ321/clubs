import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import ClubMain from './components/clubs/club_main';
import UserMain from './components/users/user_main';
import UserAppContainer from './components/users/user_app_container';
import UserNearbyIndexContainer from './components/users/nearby/nearby_index_container';
import UserMyclubIndexContainer from './components/users/myclub/myclub_index_container';
import UserMyactivityIndexContainer from './components/users/myactivity/myactivity_index_container';
import ActivityIndexContainer from './components/clubs/activity/activity_index_container';
import ClubActivityIndexContainer from './components/clubs/activity/activity_index_container';
import ActivityDetailContainer from './components/activities/activity_detail_container';
import ClubManagement from './components/clubs/club_management_page';
import ClubPostIndex from './components/clubs/club_post_index';
import ClubAppContainer from './components/clubs/club_app_container';
import UserFriendListContainer from './components/users/friends/friend_list_container.jsx';
import UserMessageListContainer from './components/users/message/message_list_container';
import UserMessageChatContainer from './components/users/message/message_chat_container';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = (
  <MuiThemeProvider>
  <Router history={browserHistory} >
    <Route path="/" component={App} />
    <Route path="/club/:clubId" component={ClubAppContainer} >
      <IndexRoute component={ClubMain} />
      <Route path='/club/:clubId/activities' component={ClubActivityIndexContainer} />
      <Route path='/club/:clubId/activity/:activityId' component={ActivityDetailContainer} />
      <Route path='/club/:clubId/posts' component={ClubPostIndex} />
      <Route path='/club/:clubId/management' component={ClubManagement} />
    </Route>
    <Route path="/user/:userId" component={UserAppContainer} >
      <IndexRoute component={UserMain} />
      <Route path='/user/:userId/nearby' component={UserNearbyIndexContainer} />
      <Route path='/user/:userId/myclub' component={UserMyclubIndexContainer} />
      <Route path='/user/:userId/myactivity' component={UserMyactivityIndexContainer} />
      <Route path='/user/:userId/friends' component={UserFriendListContainer} />
      <Route path='/user/:userId/messages' component={UserMessageListContainer} />
      <Route path='/user/:userId/messages/:userId' component={UserMessageChatContainer} />
    </Route>
  </Router>
  </MuiThemeProvider>

);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
