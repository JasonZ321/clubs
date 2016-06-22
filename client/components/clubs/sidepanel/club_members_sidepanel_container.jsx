import { composeWithTracker } from 'react-komposer';
import ClubMembersSideList from './club_members_side_list';
import {ClubUser} from '../../../../imports/collection/club_user';
function composer(props, onData) {
	const clubId = props.club._id;
	if (Meteor.subscribe("clubMembers", clubId).ready()) {
		const userIds = ClubUser.find({clubId}, { 'sort': {'createdAt': 1 }}).fetch().map(clubUser => clubUser.userId);
		// I didn't fetch users directly from server because it will always return the user current logged in.
		const users = Meteor.users.find({_id : { $in : userIds }}).fetch();
		onData(null, {users});
	}
}

export default composeWithTracker(composer)(ClubMembersSideList);
