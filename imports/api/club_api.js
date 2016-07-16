

export function createClub(club, callback) {
	Meteor.call('clubs.insert', club, function(error, result) {
		if (error) {
			console.log("error", error);
		}
		if (result) {
			console.log("Club %s was created.", result );
		}
		if (callback) {
			callback(error, result);
		}
	});
}

export function updateClub(clubId, club, callback) {
	Meteor.call("clubs.update", clubId, club, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("Club with id %s was updated.", clubId);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function removeClub(club, callback) {
	Meteor.call("clubs.remove", club, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("Club %s was deleted.", result.name);
		}
		if (callback) {
			callback(result);
		}
	});
}

export function userJoinClub(clubId, callback) {
	const userId = Meteor.userId();
	Meteor.call("club_user.insert", {clubId, userId}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("User '%s' joined Club '%s' ", userId, clubId);
		}
	});
}

export function userQuitClub(clubId, callback) {
	const userId = Meteor.userId();
	Meteor.call("club_user.remove", {clubId, userId}, function(error, result){
		if(error){
			console.log("error", error);
		}
		if(result){
			console.log("User '%s' quited Club '%s' ", userId, clubId);
		}
		if (callback) {
			callback(result);
		}
	});
}
