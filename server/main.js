import { Meteor } from 'meteor/meteor';
import { Images } from '../imports/collection/image';
import { Clubs } from '../imports/collection/clubs';
import { Activities } from '../imports/collection/activities';
import { ActivityUser } from '../imports/collection/activity_user';
import { ClubUser } from '../imports/collection/club_user';
import { Comments } from '../imports/collection/comments';
import { ActivityImage } from '../imports/collection/activity_image';

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

function publish() {
	Meteor.publish('clubs', function() {
    return Clubs.find({});
  });

  Meteor.publish('currentUser', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Meteor.users.find({_id: this.userId});
  });

  Meteor.publish('user', function(userId) {
    return Meteor.users.find({_id: userId});
  });

  Meteor.publish('currentClub', function() {
    return Clubs.find({owner: this.userId});
  });

  Meteor.publish('club', function(clubId) {
    return Clubs.find({'_id': clubId});
  });

  Meteor.publish("activity", function(activityId){
    return Activities.find({'_id': activityId});
  });

  Meteor.publish('clubsNearby', function() {
    return Clubs.find({});
  });

  Meteor.publish('activitiesNearby', function() {
    return Activities.find({});
  });

  Meteor.publish('activities', function(clubId) {
    return Activities.find({clubId});
  });

  Meteor.publish('joinedClubs', function(userId) {
    const clubUserIds = ClubUser.find({userId}).fetch().map(clubUser => clubUser.clubId);
    return Clubs.find({_id : { $in : clubUserIds }});
  });

  Meteor.publish("joinedActivities", function(userId){
    const activityUserIds = ActivityUser.find({userId}).fetch().map(activityUser => activityUser.activityId);
    return Activities.find({_id : { $in : activityUserIds }});
  });

  Meteor.publish('userClubs', function(userId) {
    return ClubUser.find({userId});
  });

  Meteor.publish("userActivities", function(userId){
    return ActivityUser.find({userId});
  });

  Meteor.publish("activityComments", function(activityId) {
    return Comments.find({activityId});
  });

  Meteor.publish("activityGallery", function(activityId) {
    return ActivityImage.find({activityId});
  });
}

Meteor.startup(() => {
  // code to run on server at startup
  setUpImageServer();
  publish();
  Accounts.onCreateUser(function(options, user) {
    user.isClubUser = options.isClubUser;
    return user;
  });
});
