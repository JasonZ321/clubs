import React from 'react';
import {ListItem, List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { browserHistory } from 'react-router';

function navigateToUser(user) {
	const url = `/user/${user._id}`;
	browserHistory.push(url);
}

function renderList(users) {
	return users.map(user => <ListItem key={user._id} onClick={() => {navigateToUser(user)}} primaryText={user.profile.name} leftAvatar={<Avatar src={user.profile.avatarURL} />} />)
}
const ClubMembersSideList = (props) => {
	return (
		<List>
			<Subheader>社团成员</Subheader>
			{renderList(props.users)}
		</List>
	);
}

export default ClubMembersSideList;
