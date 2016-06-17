function joinClub(clubId) {
	const userId = Meteor.userId();
	Meteor.call('club_user.insert', {clubId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' joined Club '%s'", userId, clubId);
		}
	});
}

function unjoinClub(clubId) {
	const userId = Meteor.userId();
	Meteor.call('club_user.remove', {clubId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' unjoined Club '%s' ", userId, clubId);
		}
	});
}

function joinActivity(activityId) {
	const userId = Meteor.userId();
	Meteor.call('activity_user.insert', {activityId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' joined Activity '%s' ", userId, activityId);
		}
	});
}

function unjoinActivity(activityId) {
	const userId = Meteor.userId();
	Meteor.call('activity_user.remove', {activityId, userId}, function(error) {
		if (error) {
			console.error(error);
		} else {
			console.log("User '%s' unjoined Activity '%s' ", userId, activityId);
		}
	});
}

export const clubCallbacks = { joinClub, unjoinClub };
export const activityCallbacks = { joinActivity, unjoinActivity };
