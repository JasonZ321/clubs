import { Meteor } from 'meteor/meteor';
import { Images } from '../imports/api/image';
import { Clubs } from '../imports/api/clubs';

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
});
