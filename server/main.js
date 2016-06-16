import { Meteor } from 'meteor/meteor';
import { Images } from '../imports/api/image';
import { Clubs } from '../imports/api/clubs';
import { Activities } from '../imports/api/activities';

function setUpImageServer() {
  Images.allow({
    'insert': function() {
        // add custom authentication code here
        return true;
    },
    'update': function() {
        // add custom authentication code here
        return true;
    },
    'remove': function() {
        // add custom authentication code here
        return true;
    },
    download: function(userId, fileObj) {
        return true
    }
  });
}

Meteor.startup(() => {
  // code to run on server at startup
  setUpImageServer();
  Meteor.publish('clubs', function() {
    return Clubs.find({});
  });

  Meteor.publish('currentUser', function() {
    return Meteor.users.find({_id: this.userId});
  });

  Meteor.publish('currentClub', function() {
    return Clubs.find({owner: this.userId});
  })

  Meteor.publish('clubsNearby', function() {
    return Clubs.find({});
  })

  Meteor.publish('activitiesNearby', function() {
    return Activities.find({});
  })

  Meteor.publish('activities', function(clubId) {
    return Activities.find({clubId});
  })

  Accounts.onCreateUser(function(options, user) {
    user.isClubUser = options.isClubUser;
    return user;
  });
});
