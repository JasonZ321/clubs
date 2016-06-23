import { composeWithTracker } from 'react-komposer';
import { Friends } from '../../../../imports/collection/friends';
import FriendList from './friend_list';
import { getIdByURL } from '../../../../imports/util/common_util';


function composer(props, onData) {
	const url = props.location.pathname;
	const userId = getIdByURL(url, "/user/");
	if (Meteor.subscribe("friends", userId).ready()) {
		const myFriends = Friends.findOne({self: userId});
		if (myFriends && Meteor.subscribe("users", myFriends.friends).ready()) {
			const friends = Meteor.users.find({_id : { $in : myFriends.friends }}).fetch();
			onData(null, {userId, friends});
		} else {
			onData(null, {userId});
		}
	}
}

export default composeWithTracker(composer)(FriendList);
