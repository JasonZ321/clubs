import { Meteor } from 'meteor/meteor';
import { Images } from '../imports/collection/image';
import { Clubs } from '../imports/collection/clubs';
import { Activities } from '../imports/collection/activities';
import { ActivityUser } from '../imports/collection/activity_user';
import { ClubUser } from '../imports/collection/club_user';
import { Comments } from '../imports/collection/comments';
import { ActivityImage } from '../imports/collection/activity_image';
import { Friends } from '../imports/collection/friends';
import { Chats } from '../imports/collection/chats';
import { Announcements } from '../imports/collection/announcements';
import { Articles } from '../imports/collection/articles';

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

  //TODO needs to be replaced by users subscription
  Meteor.publish('user', function(userId) {
    return Meteor.users.find({_id: userId});
  });

  Meteor.publish("users", function(userIds){
    return Meteor.users.find({_id : { $in : userIds }});
  });

  Meteor.publish('currentClub', function() {
    return Clubs.find({owner: this.userId});
  });

  Meteor.publish('club', function(clubId) {
    return Clubs.find({'_id': clubId});
  });

  Meteor.publish('clubByOwner', function(userId) {
    return Clubs.find({'owner': userId});
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

  Meteor.publish("clubMembers", function(clubId) {
    return ClubUser.find({clubId});
  });

  Meteor.publish("activityMembers", function(activityId) {
    return ActivityUser.find({activityId});
  });

  Meteor.publish("friends", function(self){
    return Friends.find({self});
  });

  Meteor.publish("chat", function(sender, receiver){
    return Chats.find({sender, receiver});
  });

  Meteor.publish("chats", function(sender) {
    return Chats.find({sender});
  });

  Meteor.publish("announcements", function(clubId){
    return Announcements.find({clubId});
  });

  Meteor.publish("articles", function(clubId){
    return Articles.find({clubId});
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
