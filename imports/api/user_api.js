import { Images } from '../collection/image';
import { Meteor } from 'meteor/meteor';
import { Clubs } from '../collection/clubs';
import { Friends } from '../collection/friends';
import { IMAGE_BASE_URL } from '../util/constants';

export function createClubUser({email, password, city, name}, callback) {
	Accounts.createUser({email, password, isClubUser: true}, function(error){
		if (error) {
			console.log(error);
		} else {

			Meteor.call("clubs.insert", {name, city}, function(error, result){
				if(error){
					console.log("error", error);
				}
				if(result){
					console.log("Club user %s created", name);
				}
				if (callback) {
					callback(result);
				}
			});
		}
	});
}

export function createNormalUser({email, name, password}, callback) {
	Accounts.createUser({email, password, isClubUser: false}, function(error, result){
		if (error) {
			console.log(error);
		} else {
			const userId = Meteor.userId();
			Meteor.users.update({_id: userId}, { $set:{"profile.name": name} });
			console.log("User %s created", name);
			if (callback) {
				callback(userId);
			}
		}

	});
}

export function loginClubUser(email, password, callback) {
	Meteor.loginWithPassword(email, password, function (error) {
		if (error) {
			alert('wrong password or email!');
		} else {
			Meteor.subscribe('currentClub', function() {
				const club = Clubs.findOne({'owner': Meteor.userId()});
				if (!club) {
					console.log("user %s doesn't have a club", Meteor.userId());
					return;
				}
				if (callback) {
					callback(club);
				}
			});
		}
	})
}

export function loginNormalUser(email, password, callback) {
	Meteor.loginWithPassword(email, password, function (error) {

		if (error) {
			alert('wrong password or email!');
		} else {
			const userId = Meteor.userId();
			console.log("User %s logged in", userId);
			if (callback) {
				callback(userId);
			}
		}
	});
}

export function updateUser(userId, user, callback) {
	Meteor.users.update({_id:userId}, { $set:user});
	if (callback) {
		callback();
	}
}

export function addFriend(friend, callback) {
	const self = Meteor.userId();
	if (friend === self) {
		console.log("Tried to add friend to yoursef %s", self);
		return;
	}
	Meteor.call("friends.add", {self, friend});
	Meteor.call("friends.add", {self: friend, friend: self});
	console.log("User %s and %s are friends now", self, friend);
	if (callback) {
		callback();
	}
}

export function removeFriend(friend, callback) {
	const self = Meteor.userId();
	if (friend === self) {
		console.log("Tried to remove frient to yoursef %s", self);
	}
	Meteor.call("friends.remove", {self, friend});
	Meteor.call("friends.remove", {self: friend, friend: self});
	console.log("User %s and %s are not friends any more", self, friend);
	if (callback) {
		callback();
	}
}

export function sendMessage(receiver, content) {
	Meteor.call("message.send", {receiver, content}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("Message %s send", content);
		}
	});
}

export function removeChat(receiver) {
	Meteor.call("chats.remove", receiver, function(error, result){
		if(error){
			console.log("error", error);
		} else {
			console.log("Chat removed");
		}
	});
}
